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
    "awards",
    "repo",
    "skills",
    "website",
  ] as const;
  type EchoCommand = typeof echoCommands[number];
  const utilityCommands = ["clear", "all", "cv"] as const;
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
          <dt>repo</dt>
          <dd>Take a look at some of my work</dd>
          <dt>resume</dt>
          <dd>Check out my resume</dd>
          <dt>contact</dt>
          <dd>Reach me!</dd>
          <dt>github</dt>
          <dd>Other things I do</dd>
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
        <p>
          My previous formal work experience includes:
          <ul>
            <li>
              working on asset management software at{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.fundamental.net"
              >
                Fundamental Software
              </a>
              ;
            </li>
            <li>
              working for a great content creation app called{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://madewithover.com"
              >
                Over
              </a>
              ;
            </li>
            <li>
              helping people to buy, store, and learn about cryptocurrency at{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://luno.com"
              >
                Luno
              </a>
              .
            </li>
          </ul>
        </p>
        <p>
          Nowadays I'm developing a method to download food... I wish! I am
          currently working at{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://stitch.money"
          >
            Stitch
          </a>
          , developing a single API for payments and financial data in Africa.
        </p>
        <p>
          Please feel free to get in touch with me to discuss any cool
          opportunities. My contact details can be found by typing 'contact',
          and if you would like to check out my {glow("CV")}, simply type 'cv'
          or click{" "}
          <a href="CV.pdf" download="Craig Feldman - Curriculum Vitae.pdf">
            here
          </a>
          .
        </p>
      </div>
    ),
    projects: (
      <>
      <ul>
          <li>
            <a href="https://github.com/daxtangco/terminal-react/blob/106c7ba22ccfce86bd9e5d3e0b7effbb411cea98/public/password_vault" download="password_vault.zip">Password Vault</a>
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
      </ul>
      </>
    ),
    contact: (
      <>
        <dl>
          <dt>Email</dt>
          <dd>
            <a href="mailto:craig@craigfeldman.com">craig@craigfeldman.com</a>
          </dd>
          <dt>Smoke signals</dt>
          <dd>general Cape Town region</dd>
          <dt>myspace</dt>
          <dd>just kidding</dd>
        </dl>
      </>
    ),
    awards: (
      <>
        <dl>
          <dt>2016</dt>
          <dd>University of Oxford full scholarship</dd>
          <dd>
            Standard Bank Africa Chairman's Scholarship (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.standardbank.com/sbg/careers/early-careers/early-careers-overview/chairmans-scholarship"
            >
              view scholarship
            </a>
            )
          </dd>

          <dt>2015</dt>
          <dd>Dean's Merit List</dd>

          <dt>2014</dt>
          <dd>Dean's Merit List</dd>
          <dd>BSG Prize (Best 3rd year Computer Science student)</dd>
          <dd>Class Medal (1st place) for all 3 Computer Science courses</dd>
          <dd>Commerce Faculty Scholarship</dd>

          <dt>2013</dt>
          <dd>Dean's Merit List</dd>
          <dd>Computer Science Merit Award (top 5%)</dd>
          <dd>Class Medal for Inferential Statistics</dd>
          <dd>Computer Science Merit Award (top 5%)</dd>
          <dd>Commerce Faculty Scholarship</dd>

          <dt>2012</dt>
          <dd>Dean's Merit List</dd>
          <dd>Computer Science Merit Award (top 5%)</dd>
        </dl>
      </>
    ),
    repo: (
      <>
        <ul>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/craig-feldman"
            >
              GitHub
            </a>{" "}
            - Unfortunately, I could only make a small subset of my projects
            public.
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://bitbucket.org/fldcra001"
            >
              Bitbucket
            </a>{" "}
            - A few university projects.
          </li>
        </ul>
      </>
    ),
    skills: (
      <>
        <div className="terminal-heading">Languages</div>
        <dl>
          <dt>TypeScript</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#00DE12", textShadow: "0 0 5px #00DE12" }}>
              #############
            </span>{" "}
            ##
          </dd>
          <dt>Go</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#00DE12", textShadow: "0 0 5px #00DE12" }}>
              ############
            </span>
            {"  "}
            ##
          </dd>
          <dt>Kotlin</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#42D100", textShadow: "0 0 5px #42D100" }}>
              ###########
            </span>
            {"   "}
            ##
          </dd>
          <dt>Java</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#42D100", textShadow: "0 0 5px #42D100" }}>
              ###########
            </span>
            {"   "}
            ##
          </dd>
          <dt>C# and C++</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#99D100", textShadow: "0 0 5px #99D100" }}>
              ########
            </span>
            {"      "}
            ##
          </dd>
          <dt>Python</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#D16200", textShadow: "0 0 5px #D16200" }}>
              #####
            </span>
            {"         "}
            ##
          </dd>
        </dl>

        <div className="terminal-heading">Cloud &amp; Infrastructure</div>
        <dl>
          <dt>GCP / Firebase</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#99D100", textShadow: "0 0 5px 99D100" }}>
              #########
            </span>
            {"     "}
            ##
          </dd>
          <dt>Azure</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#99D100", textShadow: "0 0 5px 99D100" }}>
              #########
            </span>
            {"     "}
            ##
          </dd>
          <dt>AWS</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#99D100", textShadow: "0 0 5px #99D100" }}>
              ########
            </span>
            {"      "}
            ##
          </dd>
          <dt>
            Infrastructure <br />
            <span style={{ fontSize: "smaller" }}>
              (Docker, Kubernetes, DBs, etc.)
            </span>
          </dt>
          <dd>
            ##{" "}
            <span style={{ color: "#99D100", textShadow: "0 0 5px 99D100" }}>
              #########
            </span>
            {"     "}
            ##
          </dd>
        </dl>

        <div className="terminal-heading">Web</div>
        <dl>
          <dt>React</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#00DE12", textShadow: "0 0 5px #00DE12" }}>
              ############
            </span>
            {"  "}
            ##
          </dd>
          <dt>Angular</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#D16200", textShadow: "0 0 5px #D16200" }}>
              #####
            </span>
            {"         "}
            ##
          </dd>
          <dt>General web development</dt>
          <dd>
            ##{" "}
            <span style={{ color: "#5BD100", textShadow: "0 0 5px 5BD100" }}>
              #########
            </span>
            {"     "}
            ##
          </dd>
        </dl>
      </>
    ),
    website: (
      <>
        <p>
          I built this website from scratch using {glow("React")} and{" "}
          {glow("TypeScript")}. It is a rewrite of my{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/craig-feldman/personal-website"
          >
            previous
          </a>{" "}
          website that used{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://terminal.jcubic.pl/"
          >
            JQuery Terminal Plugin
          </a>{" "}
          (and some inspiration from{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.ronniepyne.com"
          >
            Ronnie Pyne
          </a>
          ).
        </p>
        <p>
          The source code for this site can be found on{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/craig-feldman/personal-website-react"
          >
            GitHub
          </a>
          . Feel free to use this website for inspiration, or go ahead and copy
          some of the code! If you do, all I ask is that you give this site a
          mention :)
        </p>
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
          "awards",
          "skills",
          "projects",
          "repo",
          "contact",
          "website",
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
      case "cv": {
        setOutput([...output, commandRecord]);
        downloadFile("CV.pdf", "Craig Feldman - Curriculum Vitae.pdf");
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
