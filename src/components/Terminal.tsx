import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import TerminalOutput from "./TerminalOutput";
import InputArea from "./InputArea";
import ErrorMessage from "./ErrorMessage";
import WelcomeMessage from "./WelcomeMessage";
import { logEvent } from "firebase/analytics";

// Just a little helper function so I don't have to continually update my age
const getAge = (birthDate: Date) => {
  var today = new Date();
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const downloadFile = (uri: string, downloadName: string) => {
  const link = document.createElement("a");
  link.download = downloadName;
  link.href = uri;
  link.click();
  link.remove();
};

type TerminalProps = {
  terminalPrompt?: string;
  banner?: string;
  welcomeMessage?: string;
};
const Terminal = (props: TerminalProps) => {
  const { terminalPrompt = ">", banner, welcomeMessage } = props;
  const [output, setOutput] = useState<(string | JSX.Element)[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(3);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const scrollLastCommandTop = () => {
    scrollRef.current?.scrollIntoView();
  };

  useEffect(scrollLastCommandTop, [output]);

  const echoCommands = [
    "help",
    "about",
    "projects",
    "contact",
    "exp",
    "skills",
    "github",
  ] as const;
  type EchoCommand = typeof echoCommands[number];
  const utilityCommands = ["clear", "all", "resume"] as const;
  type UtilityCommand = typeof utilityCommands[number];
  const allCommands = [...echoCommands, ...utilityCommands] as const;
  type Command = typeof allCommands[number];

  function isEchoCommand(arg: string): arg is EchoCommand {
    return (echoCommands as ReadonlyArray<string>).includes(arg);
  }

  function isUtilityCommand(arg: string): arg is UtilityCommand {
    return (utilityCommands as ReadonlyArray<string>).includes(arg);
  }

  function isValidCommand(arg: string): arg is Command {
    return isEchoCommand(arg) || isUtilityCommand(arg);
  }

  const glow = (text: string) => {
    return <span className="terminal-glow">{text}</span>;
  };

  const commands: { [key in EchoCommand]: JSX.Element } = {
    help: (
      <div>
        <p>
          Type any of the commands below
          to get some more info. You can even type a few letters and press [tab]
          or '.' to autocomplete.
        </p>
        <dl>
          <dt>about</dt>
          <dd>Get to know me</dd>
          <dt>projects</dt>
          <dd>Things I've done, Web, Mobile development, and cybersecurity</dd>
          <dt>skills</dt>
          <dd>Things I know</dd>
          <dt>exp</dt>
          <dd>Work Experience and Academics</dd>
          <dt>github</dt>
          <dd>Take a look at some of my work</dd>
          <dt>resume</dt>
          <dd>Check out my resume</dd>
          <dt>contact</dt>
          <dd>Reach me!</dd>
          <dt>all</dt>
          <dd>Tell me everything</dd>
          <dt>clear</dt>
          <dd>Clears the terminal of all output</dd>
        </dl>
      </div>
    ),
    about: (
      <div>
        <p>
          As you probably know, my name is {glow("Dax Tangco")}. I'm a{" "}
          {getAge(new Date(2000, 8, 10))} year old {glow("Computer Engineer")}{" "}
          born in the Philippines living in Manila.
        </p>
        <p>
        Former developer and security enthusiast, I love doing projects that combine these two interests of mine. My experience in development, together with my hunger for knowledge with new technologies, allows me to have a better grasp of the future that is very near for some of us. I am a self-starter, and I believe that in life we should never stop learning. And I am always looking for challenges and other ways to gain knowledge to go deeper within new technologies.
        </p>
      </div>
    ),
    projects: (
      <>
      <ul>
          <li>
            <a href="https://github.com/daxtangco/terminal-react/blob/0f1008bd7f1289a2d34cb10096866db319a8b88f/public/dist.zip">Password Vault (Download it here)</a>
            <ul>
              <li>
                Source Code: <a href="https://github.com/daxtangco/password-vault.git">Github Repo</a>
              </li>
              <li>
                Tech stack: Python, TKInter, SHA256
              </li>
              <li>
                Description: Local Password vault that manages your different account and has a built in password generator for your different passwords.
              </li>
            </ul>
          </li>
          <br/>
          <li>
            <a href="https://drive.google.com/file/d/1gWuoOkN9ULCdHTNt77GYMe0JP2uJp1jH/view?usp=sharing">Landmarks (Preview)</a>
            <ul>
              <li>
                Source Code: <a href="https://github.com/daxtangco/Landmarks">Github Repo</a>
              </li>
              <li>
                Tech stack: Swift, SwiftUI, UIKit
              </li>
              <li>
                Description: Made to guide travelers, especially hikers to where there next destination is, and will also track their condition.
              </li>
            </ul>
          </li>
          <br/>
          <li>
            <a href="https://musicapp-kodego-proj.vercel.app/">MusicApp</a>
            <ul>
              <li>
                Source Code: <a href="https://github.com/boymelvs/musicapp">Github Repo</a>
              </li>
              <li>
                Tech stack: SASS, ReactJS, NodeJS, SQL
              </li>
              <li>
                Description: Website that is made for music lovers and with simplified experience. Integrated Spotify API for the tracks, albums, and artists. It is also made with ReactJS for a faster and better transition from different sections.
              </li>
            </ul>
          </li>
          <br/>
          <li>
            <a href="https://pairgo.vercel.app/">Pairgo</a>
            <ul>
              <li>
                Source Code: <a href="https://github.com/boymelvs/pairgo">Github Repo</a>
              </li>
              <li>
                Tech stack: HTML,CSS, SASS, Javascript
              </li>
              <li>
                Description: Warehousing website that caters every storage that is needed for a supplier. Includes delivery and transportation services. A simple website that is compelete from the front-end.
              </li>
            </ul>
          </li>
          <br />
          <li>
            <a href="https://drive.google.com/file/d/19imUILQ4wg7lpouG-e13eXeLDgmpB-lI/view?usp=sharing">SwiftUI Slots</a>
            <ul>
              <li>
                Source Code: <a href="https://github.com/daxtangco/swiftui-slots">Github Repo</a>
              </li>
              <li>
                Tech stack: Swift, SwiftUI
              </li>
              <li>
                Description: A simple slot machines that uses the basics of Swift and SwiftUI for practice.
              </li>
            </ul>
          </li>
          <br/>
          <li>
            <a href="https://drive.google.com/file/d/1czWntJ6k5_8tmY3kcWE_MVNoll76YFAx/view?usp=sharing">War Challenge Card Game</a>
            <ul>
              <li>
                Source Code: <a href="https://github.com/daxtangco/war-challenge">Github Repo</a>
              </li>
              <li>
                Tech stack: Swift, SwiftUI
              </li>
              <li>
                Description: A Card game that compares the card and adds up the point to the player with higher number using Swift and SwiftUI
              </li>
            </ul>
          </li>
          <br />
          <li>
            <a href="https://daxtangco.github.io/">Lakwatsa</a>
            <ul>
              <li>
                Source Code: <a href="https://github.com/daxtangco/daxtangco.github.io">Github Repo</a>
              </li>
              <li>
                Tech stack: HTML,CSS
              </li>
              <li>
                Description: A travel website that solely focuses on the design of the website, with only using HTML and CSS3
              </li>
            </ul>
          </li>
          <br />
      </ul>
      </>
    ),
    contact: (
      <>
        <dl>
          <dt>Email</dt>
          <dd>
            <a href="mailto:daxtangco@gmail.com">daxtangco@gmail.com</a>
          </dd>
          <dt>LinkedIn</dt>
          <dd><a href="https://www.linkedin.com/in/daxtangco/">Dax Axis Tangco</a></dd>
          <dt>Mobile</dt>
          <dd>+63 947 756 0064</dd>
        </dl>
      </>
    ),
    exp: (
      <>
        <dl>
        <div className="terminal-heading">Work Experience</div>
        <br />
          <dt>Technical Support Engineer</dt>
          <dd><a href="https://www.spreedly.com/">Spreedly</a></dd>
          <ul>
            <li>Handled Triage tickets, Receiver tickets, Migration tickets, Export tickets, and Import Tickets</li>
            <li>Handled investigations in customer’s queries in terms of gateway, payment method, or transaction</li>
            <li>Escalated properly to the teams responsible for the incidents of specific events</li>
          </ul>

          <dt>Web/Mobile Application Developer</dt>
          <dd><a href="https://www.volenday.com/">Volenday</a></dd>
          <ul>
            <li>Developed AHAmatic Website</li>
            <li>Developed an Android application for employees</li>
            <li>Used NextJS to develop the website and Flutter for the Mobile Application</li>
          </ul>

          <dt>Junior Web Developer</dt>
          <dd><a href="https://fil-global.com/">Fil-Global Immigration Services</a></dd>
          <ul>
            <li>In charge of the maintenance of the website of the company.</li>
            <li>Assisting website inquiries of the client and admin website.</li>
            <li>Maintained the Mobile Application written in React Native</li>
          </ul>

        <div className="terminal-heading">Certifications</div>
        <br />
          <dt>Security+ (Preparing)</dt>
          <dd>CompTIA Certification</dd>

          <dt>Introduction to Cybersecurity</dt>
          <dd><a href="https://cs50.harvard.edu/cybersecurity/2023/#how-to-take-this-course">Harvard CS50 (Audit)</a></dd>
          <ul>
            <li>Coursework: </li>
              <ul>
                <li>Securing Accounts</li>
                <li>Securing Data</li>
                <li>Securing Systems</li>
                <li>Securing Software</li>
                <li>Preserving Privacy</li>
              </ul>
            <li>Proficient in cybersecurity for personal and professional applications, focusing on threat recognition, privacy
protection, and risk-reward analysis. Experienced in addressing real-world security challenges.</li>
          </ul>

          <dt>Google Cybersecurity Professional</dt>
          <dd><a href="https://www.coursera.org/account/accomplishments/specialization/certificate/PLRWGX5FM2WN">Google Certification</a></dd>
          <ul>
            <li>Coursework:</li>
            <ul>
              <li>Foundation of Cybersecurity</li>
              <li>Manage Security Risks</li>
              <li>Network Security</li>
              <li>Linux</li>
              <li>SQL</li>
              <li>Detection and Response</li>
              <li>Assets, Threats, and Vulnerabilities</li>
              <li>Automate Cybersecurity with Python</li>
            </ul>
            <li>Prepared for entry-level cybersecurity roles with practical, hands-on assessments. Proficient in beginner-level Python,
Linux, SQL, SIEM tools, and IDS. Skilled in identifying and mitigating common cybersecurity risks, threats, and
vulnerabilities.</li>
          </ul>

        <div className="terminal-heading">Education</div>
        <br />
          <dt>BSc Computer Engineering</dt>
          <dd>De La Salle University</dd>
          <ul>
            <li>1st Honors Dean's Lister, 2nd Honors Dean's Lister</li>
            <li>Involvements: </li>
              <ul>
                <li>Google Developer Students Club - Chief Technology Officer</li>
                <li>University Student Government Executive - Creatives</li>
                <li>Engineering College Government - Chaiperson</li>
              </ul>
            <li>Coursework: </li>
              <ul>
                <li>Computer Architecture and Organization</li>
                <li>Computer and Network Security</li>
                <li>Computer Systems Administration</li>
                <li>Intelligent Engineering System</li>
                <li>Computer Fundamentals and Programming</li>
              </ul>
          </ul>
        </dl>
      </>
    ),
    github: (
      <>
        <ul>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/daxtangco"
            >
              GitHub
            </a>{" "}
            - daxtangco
          </li>
        </ul>
      </>
    ),
    skills: (
      <>
        <div className="terminal-heading">Languages</div>
        <dl>
          <dt>Python</dt>
          <dt>SQL</dt>
          <dt>PHP</dt>
          <dt>Bash</dt>
          <dt>C</dt>
          <dt>Javascript</dt>
          <dt>Typescript</dt>
        </dl>

        <div className="terminal-heading">Operating Systems</div>
        <dl>
          <dt>MacOS</dt>
          <dt>Linux</dt>
          <dt>Windows</dt>
        </dl>

        <div className="terminal-heading">Database</div>
        <dl>
          <dt>MongoDB</dt>
          <dt>MySQL</dt>
          <dt>XAMPP</dt>
        </dl>

        <div className="terminal-heading">Tools</div>
        <dl>
          <dt>Git</dt>
          <dt>Github</dt>
          <dt>VSCode</dt>
          <dt>PyCharm</dt>
          <dt>PHPMyAdmin</dt>
          <dt>Zendesk</dt>
          <dt>Jira</dt>
          <dt>Postman</dt>
          <dt>Splunk</dt>
          <dt>Chronicle</dt>
        </dl>
      </>
    ),
  };

const processCommand = (input: string) => {

  const commandRecord = (
    <div
      ref={(el) => (scrollRef.current = el)}
      className="terminal-command-record"
    >
      <span className="terminal-prompt">{terminalPrompt}</span>{" "}
      <span>{input}</span>
    </div>
  );

  if (input.trim()) {
    setHistory([...history, input]);
    setHistoryIndex(history.length + 1);
  }

  const inputCommand = input.toLowerCase();
  if (!isValidCommand(inputCommand)) {
    setOutput([
      ...output,
      commandRecord,
      <div className="terminal-command-output">
        <ErrorMessage command={inputCommand} />
      </div>,
    ]);
  } else if (isEchoCommand(inputCommand)) {
    setOutput([
      ...output,
      commandRecord,
      <div className="terminal-command-output">{commands[inputCommand]}</div>,
    ]);
  } else if (isUtilityCommand(inputCommand)) {
    switch (inputCommand) {
      case "clear": {
        setOutput([]);
        break;
      }
      case "all": {
        const allCommandsOutput = [
          "about",
          "exp",
          "skills",
          "projects",
          "contact",
          "github",
        ].map((command) => (
          <>
            <div className="terminal-heading">{command}</div>
            <div className="terminal-command-output">
              {commands[command as EchoCommand]}
            </div>
          </>
        ));

        setOutput([commandRecord, ...allCommandsOutput]);
        break;
      }
      case "resume": {
        setOutput([...output, commandRecord]);
        downloadFile("resume.pdf", "Dax Tangco - Resume.pdf");
        break;
      }
    }
  }
};


  const getHistory = (direction: "up" | "down") => {
    let updatedIndex;
    if (direction === "up") {
      updatedIndex = historyIndex === 0 ? 0 : historyIndex - 1;
    } else {
      updatedIndex =
        historyIndex === history.length ? history.length : historyIndex + 1;
    }
    setHistoryIndex(updatedIndex);
    return updatedIndex === history.length ? "" : history[updatedIndex];
  };

  const getAutocomplete = (input: string) => {
    const matchingCommands = allCommands.filter((c) => c.startsWith(input));
    if (matchingCommands.length === 1) {
      return matchingCommands[0];
    } else {
      const commandRecord = (
        <div
          ref={(el) => (scrollRef.current = el)}
          className="terminal-command-record"
        >
          <span className="terminal-prompt">{terminalPrompt}</span>{" "}
          <span>{input}</span>
        </div>
      );
      setOutput([...output, commandRecord, matchingCommands.join("    ")]);
      return input;
    }
  };

  const focusOnInput = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      // Prevent tab from moving focus
      event.preventDefault();
    }
    inputRef.current?.focus();
  };

  return (
    <div className="terminal-container" tabIndex={-1} onKeyDown={focusOnInput}>
      <div className="terminal-content">
        {banner && <Banner banner={banner} />}
        {welcomeMessage && (
          <WelcomeMessage message={welcomeMessage} inputRef={inputRef} />
        )}
        <TerminalOutput outputs={output} />
        <InputArea
          setOutput={setOutput}
          processCommand={processCommand}
          getHistory={getHistory}
          getAutocomplete={getAutocomplete}
          inputRef={inputRef}
          terminalPrompt={terminalPrompt}
        />
      </div>
    </div>
  );
};

export default Terminal;
