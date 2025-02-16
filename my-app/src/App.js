import "./index.css";
import React, { useState } from "react";

function App() {
  const [dpc, setDpc] = useState("1");
  const [ei, setEi] = useState("");
  const [confidentiality, setConfidentiality] = useState("0");
  const [integrity, setIntegrity] = useState("0");
  const [availability, setAvailability] = useState("0");
  const [malicious, setMalicious] = useState("0");
  const [result, setResult] = useState(null);

  // State for "Know More" sections
  const [showDPCExamples, setShowDPCExamples] = useState(false);
  const [showEIExamples, setShowEIExamples] = useState(false);
  const [showConfExamples, setShowConfExamples] = useState(false);
  const [showIntegrityExamples, setShowIntegrityExamples] = useState(false);
  const [showAvailabilityExamples, setShowAvailabilityExamples] = useState(false);
  const [showMaliciousExamples, setShowMaliciousExamples] = useState(false);

  // Option descriptions
  const dpcOptions = {
    "1": "Simple: Basic personal info such as name and contact details.",
    "2": "Behavioral: Data regarding habits, preferences, or traffic data.",
    "3": "Financial: Data related to monetary transactions and bank details.",
    "4": "Sensitive: Highly sensitive information (health, politics, etc.).",
  };

  const eiOptions = {
    "0.25": "Negligible: It is very difficult to uniquely identify the individual.",
    "0.5": "Limited: Some clues exist, but identification requires effort.",
    "0.75": "Significant: Several identifiers make it easier to pinpoint the individual.",
    "1": "Maximum: The individual can be directly identified from the data.",
  };

  const confidentialityOptions = {
    "0": "None: No breach in confidentiality.",
    "0.25": "Known Recipients: Data sent to a few known contacts.",
    "0.5": "Unknown Recipients: Data sent to many or unknown recipients.",
  };

  const integrityOptions = {
    "0": "No loss: Data remains unaltered.",
    "0.25": "Altered but recoverable: Data was changed but can be restored.",
    "0.5": "Altered irrecoverably: Data was changed and cannot be recovered.",
  };

  const availabilityOptions = {
    "0": "Data recoverable: Backups or alternative sources exist.",
    "0.25": "Temporary unavailability: Data is inaccessible for a short period.",
    "0.5": "Full unavailability: Data cannot be recovered at all.",
  };

  const maliciousOptions = {
    "0": "No: The breach appears accidental.",
    "0.5": "Yes: The breach was intentional or malicious.",
  };

  // Example content for each section
  const examplesDPC =
    "Data Processing Context (DPC) Examples:\n\n" +
    "Simple:\n • Customer list of a supermarket (Score: 1)\n • Customer list of a luxury car dealership (Score: 2)\n • List from an electronic pharmacy (Score: 3)\n • List of undercover agents (Score: 4)\n\n" +
    "Behavioral:\n • Helpdesk call history (Score: 1)\n • Call history for one week (Score: 2)\n • Call history for one year (Score: 3)\n • Call history from a support center (Score: 4)";

  const examplesEI =
    "Ease of Identification (EI) Examples:\n\n" +
    "Negligible: Common name in a large country (Score: 0.25)\n" +
    "Limited: Full name in a small town (Score: 0.5)\n" +
    "Significant: Full name with additional details (Score: 0.75)\n" +
    "Maximum: Full name with date of birth or email (Score: 1)";

  const examplesConfidentiality =
    "Loss of Confidentiality Examples:\n\n" +
    "None: No data exposure (Score: 0)\n" +
    "Known Recipients: E.g., an email sent to a few contacts (Score: 0.25)\n" +
    "Unknown Recipients: E.g., data published on a public forum (Score: 0.5)";

  const examplesIntegrity =
    "Loss of Integrity Examples:\n\n" +
    "No loss: Data remains unchanged (Score: 0)\n" +
    "Altered but recoverable: Record modified but backup exists (Score: 0.25)\n" +
    "Altered irrecoverably: Record modified with no recovery (Score: 0.5)";

  const examplesAvailability =
    "Loss of Availability Examples:\n\n" +
    "Data recoverable: Backup available (Score: 0)\n" +
    "Temporary unavailability: Data inaccessible for a short time (Score: 0.25)\n" +
    "Full unavailability: Data completely lost (Score: 0.5)";

  const examplesMalicious =
    "Malicious Intent Examples:\n\n" +
    "No: Accidental breach (Score: 0)\n" +
    "Yes: Deliberate data leak (Score: 0.5)";

  const calculateSeverity = () => {
    if (!ei) {
      alert("Select a level for Ease of Identification.");
      return;
    }
    const dpcVal = parseFloat(dpc);
    const eiVal = parseFloat(ei);
    const cb =
      parseFloat(confidentiality) +
      parseFloat(integrity) +
      parseFloat(availability) +
      parseFloat(malicious);
    const severity = dpcVal * eiVal + cb;
    let level = "";
    if (severity < 2) {
      level = "Low";
    } else if (severity < 3) {
      level = "Medium";
    } else if (severity < 4) {
      level = "High";
    } else {
      level = "Very High";
    }

    setResult({
      severity: severity.toFixed(2),
      level,
      dpcValue: dpc,
      eiValue: ei,
      cbValue: cb.toFixed(2),
      breakdown: {
        "Data Processing Context (DPC)": {
          option: dpc,
          score: dpc,
          description: dpcOptions[dpc],
        },
        "Ease of Identification (EI)": {
          option: ei,
          score: ei,
          description: eiOptions[ei],
        },
        "Loss of Confidentiality": {
          option: confidentiality,
          score: confidentiality,
          description: confidentialityOptions[confidentiality],
        },
        "Loss of Integrity": {
          option: integrity,
          score: integrity,
          description: integrityOptions[integrity],
        },
        "Loss of Availability": {
          option: availability,
          score: availability,
          description: availabilityOptions[availability],
        },
        "Malicious Intent": {
          option: malicious,
          score: malicious,
          description: maliciousOptions[malicious],
        },
      },
    });
  };

  const getRiskColor = (level) => {
    if (level === "Low") return "#28a745";
    if (level === "Medium") return "#ffc107";
    if (level === "High") return "#dc3545";
    if (level === "Very High") return "#c82333";
    return "black";
  };

  const tableRows = result
    ? Object.entries(result.breakdown).map(([key, value]) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{value.option}</td>
          <td>{value.score}</td>
          <td>{value.description}</td>
        </tr>
      ))
    : null;

  return (
    <div className="container">
      <header>
        <div className="logo-container">
          <img
            src="https://www.dpoconsultancy.com/wp-content/uploads/2024/03/DPO_logo.svg"
            alt="DPO Consultancy Logo"
            className="logo"
          />
        </div>
        <div className="header-text">
          <h1>Data Breach Severity Calculator</h1>
        </div>
      </header>
      <main>
        <p>
          This framework provides a quantitative tool to assess the severity of a data breach.
          It combines various factors to generate a risk score that reflects the potential impact on individuals.
        </p>
        <p>
          The methodology is derived from ENISA. For more details about the original methodology, please&nbsp;
          <a
            href="https://www.enisa.europa.eu/publications/dbn-severity"
            target="_blank"
            rel="noopener noreferrer"
          >
            access the ENISA report here.
          </a>
        </p>
        <form>
          {/* DPC Section */}
          <div className="section">
            <h2>Data Processing Context (DPC)</h2>
            <p>DPC represents the type of data involved in the breach.</p>
            <button
              type="button"
              className="know-more"
              onClick={() => setShowDPCExamples(!showDPCExamples)}
            >
              Know More
            </button>
            {showDPCExamples && (
              <div className="examples-box">
                <pre>{examplesDPC}</pre>
              </div>
            )}
            <label htmlFor="dpc">Select the data category:</label>
            <select id="dpc" value={dpc} onChange={(e) => setDpc(e.target.value)}>
              <option value="1">Simple (1)</option>
              <option value="2">Behavioral (2)</option>
              <option value="3">Financial (3)</option>
              <option value="4">Sensitive (4)</option>
            </select>
            <p className="description">{dpcOptions[dpc]}</p>
          </div>

          {/* EI Section */}
          <div className="section">
            <h2>Ease of Identification (EI)</h2>
            <p>EI measures how easily an individual can be identified from the breached data.</p>
            <button
              type="button"
              className="know-more"
              onClick={() => setShowEIExamples(!showEIExamples)}
            >
              Know More
            </button>
            {showEIExamples && (
              <div className="examples-box">
                <pre>{examplesEI}</pre>
              </div>
            )}
            <label htmlFor="ei">Select the level of ease of identification:</label>
            <select id="ei" value={ei} onChange={(e) => setEi(e.target.value)}>
              <option value="">-- Select --</option>
              <option value="0.25">Negligible (0.25)</option>
              <option value="0.5">Limited (0.5)</option>
              <option value="0.75">Significant (0.75)</option>
              <option value="1">Maximum (1)</option>
            </select>
            <p className="description">{ei ? eiOptions[ei] : ""}</p>
          </div>

          {/* Confidentiality Section */}
          <div className="section">
            <h2>Loss of Confidentiality</h2>
            <p>This evaluates the extent of data disclosure.</p>
            <button
              type="button"
              className="know-more"
              onClick={() => setShowConfExamples(!showConfExamples)}
            >
              Know More
            </button>
            {showConfExamples && (
              <div className="examples-box">
                <pre>{examplesConfidentiality}</pre>
              </div>
            )}
            <label htmlFor="confidentiality">Select Loss of Confidentiality:</label>
            <select
              id="confidentiality"
              value={confidentiality}
              onChange={(e) => setConfidentiality(e.target.value)}
            >
              <option value="0">None (0)</option>
              <option value="0.25">Known Recipients (0.25)</option>
              <option value="0.5">Unknown Recipients (0.5)</option>
            </select>
            <p className="description">{confidentialityOptions[confidentiality]}</p>
          </div>

          {/* Integrity Section */}
          <div className="section">
            <h2>Loss of Integrity</h2>
            <p>This measures if and how the data has been altered.</p>
            <button
              type="button"
              className="know-more"
              onClick={() => setShowIntegrityExamples(!showIntegrityExamples)}
            >
              Know More
            </button>
            {showIntegrityExamples && (
              <div className="examples-box">
                <pre>{examplesIntegrity}</pre>
              </div>
            )}
            <label htmlFor="integrity">Select Loss of Integrity:</label>
            <select
              id="integrity"
              value={integrity}
              onChange={(e) => setIntegrity(e.target.value)}
            >
              <option value="0">No loss (0)</option>
              <option value="0.25">Altered but recoverable (0.25)</option>
              <option value="0.5">Altered irrecoverably (0.5)</option>
            </select>
            <p className="description">{integrityOptions[integrity]}</p>
          </div>

          {/* Availability Section */}
          <div className="section">
            <h2>Loss of Availability</h2>
            <p>This examines whether data can be accessed when needed.</p>
            <button
              type="button"
              className="know-more"
              onClick={() => setShowAvailabilityExamples(!showAvailabilityExamples)}
            >
              Know More
            </button>
            {showAvailabilityExamples && (
              <div className="examples-box">
                <pre>{examplesAvailability}</pre>
              </div>
            )}
            <label htmlFor="availability">Select Loss of Availability:</label>
            <select
              id="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="0">Data recoverable (0)</option>
              <option value="0.25">Temporary unavailability (0.25)</option>
              <option value="0.5">Full unavailability (0.5)</option>
            </select>
            <p className="description">{availabilityOptions[availability]}</p>
          </div>

          {/* Malicious Intent Section */}
          <div className="section">
            <h2>Malicious Intent</h2>
            <p>This evaluates whether the breach was accidental or intentional.</p>
            <button
              type="button"
              className="know-more"
              onClick={() => setShowMaliciousExamples(!showMaliciousExamples)}
            >
              Know More
            </button>
            {showMaliciousExamples && (
              <div className="examples-box">
                <pre>{examplesMalicious}</pre>
              </div>
            )}
            <label htmlFor="malicious">Select Malicious Intent:</label>
            <select
              id="malicious"
              value={malicious}
              onChange={(e) => setMalicious(e.target.value)}
            >
              <option value="0">No (0)</option>
              <option value="0.5">Yes (0.5)</option>
            </select>
            <p className="description">{maliciousOptions[malicious]}</p>
          </div>

          <button type="button" onClick={calculateSeverity}>
            Calculate Severity
          </button>
        </form>

        {result && (
          <div className="risk-summary">
            <h2>Risk Summary</h2>
            <p className="formula">
              Formula: SE = (DPC: {result.dpcValue}) x (EI: {result.eiValue}) + (CB: {result.cbValue})
            </p>
            <table>
              <thead>
                <tr>
                  <th>Criterion</th>
                  <th>Selected Option</th>
                  <th>Score</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </table>
            <h3>
              Final Severity Score: {result.severity} -{" "}
              <span style={{ color: getRiskColor(result.level) }}>{result.level}</span>
            </h3>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;