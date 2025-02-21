import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  // States for each criterion
  const [dpc, setDpc] = useState("1"); // DPC: scale 1-4
  const [ei, setEi] = useState("1"); // EI: scale 0.25, 0.5, 0.75, 1
  const [confidentiality, setConfidentiality] = useState("0"); // Options: 0, 0.25, 0.5
  const [integrity, setIntegrity] = useState("0"); // Options: 0, 0.25, 0.5
  const [availability, setAvailability] = useState("0"); // Options: 0, 0.25, 0.5
  const [malicious, setMalicious] = useState("0"); // Options: 0, 0.5
  const [result, setResult] = useState(null);

  // States for user text assessments
  const [dpcText, setDpcText] = useState("");
  const [eiText, setEiText] = useState("");
  const [confText, setConfText] = useState("");
  const [integrityText, setIntegrityText] = useState("");
  const [availText, setAvailText] = useState("");
  const [maliciousText, setMaliciousText] = useState("");

  // State for "Know More" toggle for DPC
  const [showDPCInfo, setShowDPCInfo] = useState(false);

  // Option descriptions updated to remove "Score" prefix
  const dpcOptions = {
    1: "1 – Simple data, e.g., basic info like name and contact details.",
    2: "2 – Behavioral data, e.g., preferences, habits, or traffic data.",
    3: "3 – Financial data, e.g., bank statements, transaction details.",
    4: "4 – Sensitive data, e.g., health or political affiliation.",
  };

  const eiOptions = {
    0.25: "0.25 – Very difficult to identify the individual.",
    0.5: "0.5 – Identification is possible but requires effort.",
    0.75: "0.75 – Several clues make identification easier.",
    1: "1 – Individual can be directly identified.",
  };

  const confOptions = {
    0: "0 – No breach in confidentiality.",
    0.25: "0.25 – Data shared with a few known recipients.",
    0.5: "0.5 – Data shared with several recipients.",
  };

  const integrityOptions = {
    0: "0 – Data remains unaltered.",
    0.25: "0.25 – Minor alterations with easy recovery.",
    0.5: "0.5 – Data altered irrecoverably.",
  };

  const availOptions = {
    0: "0 – Data recoverable; backups or alternative sources exist.",
    0.25: "0.25 – Low availability; temporary unavailability.",
    0.5: "0.5 – High unavailability; data completely lost.",
  };

  const maliciousOptions = {
    0: "0 – No; breach appears accidental.",
    0.5: "0.5 – Yes; evidence of deliberate action.",
  };

  // "Know More" info for DPC
  const dpcInfo =
    "DPC Explanation:\n\n" +
    "• 1 – Simple data: basic personal info with minimal risk.\n" +
    "• 2 – Behavioral data: user preferences or habits that may profile an individual.\n" +
    "• 3 – Financial data: detailed financial information with high risk.\n" +
    "• 4 – Sensitive data: data that can cause significant harm if disclosed.";

  // Recalculate results whenever any input changes
  useEffect(() => {
    const dpcVal = parseFloat(dpc);
    const eiVal = parseFloat(ei);
    const confVal = parseFloat(confidentiality);
    const integrityVal = parseFloat(integrity);
    const availVal = parseFloat(availability);
    const maliciousVal = parseFloat(malicious);
    const cb = confVal + integrityVal + availVal + maliciousVal;
    const severity = dpcVal * eiVal + cb;
    let level = "";
    if (severity < 3) {
      level = "Low";
    } else if (severity < 5) {
      level = "Medium";
    } else if (severity < 7) {
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
          comment: dpcText,
        },
        "Ease of Identification (EI)": {
          option: ei,
          score: ei,
          description: eiOptions[ei],
          comment: eiText,
        },
        "Loss of Confidentiality": {
          option: confidentiality,
          score: confidentiality,
          description: confOptions[confidentiality],
          comment: confText,
        },
        "Loss of Integrity": {
          option: integrity,
          score: integrity,
          description: integrityOptions[integrity],
          comment: integrityText,
        },
        "Loss of Availability": {
          option: availability,
          score: availability,
          description: availOptions[availability],
          comment: availText,
        },
        "Malicious Intent": {
          option: malicious,
          score: malicious,
          description: maliciousOptions[malicious],
          comment: maliciousText,
        },
      },
    });
  }, [
    dpc,
    ei,
    confidentiality,
    integrity,
    availability,
    malicious,
    dpcText,
    eiText,
    confText,
    integrityText,
    availText,
    maliciousText,
  ]);

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
          <td>{value.comment}</td>
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
      <main className="main-content">
        <div className="form-container">
          <p>
            This framework provides a quantitative tool to assess the severity
            of a data breach. It combines various factors to generate a risk
            score that reflects the potential impact on individuals.
          </p>
          <p>
            The methodology is derived from ENISA. For more details about the
            original methodology, please{" "}
            <a
              href="https://www.enisa.europa.eu/publications/dbn-severity"
              target="_blank"
              rel="noopener noreferrer"
            >
              access the ENISA report here.
            </a>
          </p>
          {/* DPC Section */}
          <div className="section">
            <h2>Data Processing Context (DPC)</h2>
            <p>DPC represents the type of data involved in the breach.</p>
            <label className="question">
              Why do you assign this DPC score?
            </label>
            <textarea
              value={dpcText}
              onChange={(e) => setDpcText(e.target.value)}
              placeholder="Type your explanation here..."
            ></textarea>
            <button
              type="button"
              className="know-more"
              onClick={() => setShowDPCInfo(!showDPCInfo)}
            >
              Know More
            </button>
            {showDPCInfo && (
              <div className="examples-box">
                <pre>{dpcInfo}</pre>
              </div>
            )}
            <div className="radio-group">
              {["1", "2", "3", "4"].map((score) => (
                <label key={score}>
                  <input
                    type="radio"
                    name="dpc"
                    value={score}
                    checked={dpc === score}
                    onChange={(e) => setDpc(e.target.value)}
                  />
                  {dpcOptions[score]}
                </label>
              ))}
            </div>
          </div>

          {/* EI Section */}
          <div className="section">
            <h2>Ease of Identification (EI)</h2>
            <p>
              EI measures how easily an individual can be identified from the
              breached data.
            </p>
            <label className="question">Why do you assign this EI score?</label>
            <textarea
              value={eiText}
              onChange={(e) => setEiText(e.target.value)}
              placeholder="Type your explanation here..."
            ></textarea>
            <div className="radio-group">
              {["0.25", "0.5", "0.75", "1"].map((score) => (
                <label key={score}>
                  <input
                    type="radio"
                    name="ei"
                    value={score}
                    checked={ei === score}
                    onChange={(e) => setEi(e.target.value)}
                  />
                  {eiOptions[score]}
                </label>
              ))}
            </div>
          </div>

          {/* Confidentiality Section */}
          <div className="section">
            <h2>Loss of Confidentiality</h2>
            <p>This evaluates the extent of data disclosure.</p>
            <label className="question">
              Why do you assign this Confidentiality score?
            </label>
            <textarea
              value={confText}
              onChange={(e) => setConfText(e.target.value)}
              placeholder="Type your explanation here..."
            ></textarea>
            <div className="radio-group">
              {["0", "0.25", "0.5"].map((score) => (
                <label key={score}>
                  <input
                    type="radio"
                    name="confidentiality"
                    value={score}
                    checked={confidentiality === score}
                    onChange={(e) => setConfidentiality(e.target.value)}
                  />
                  {confOptions[score]}
                </label>
              ))}
            </div>
          </div>

          {/* Integrity Section */}
          <div className="section">
            <h2>Loss of Integrity</h2>
            <p>This measures if and how the data has been altered.</p>
            <label className="question">
              Why do you assign this Integrity score?
            </label>
            <textarea
              value={integrityText}
              onChange={(e) => setIntegrityText(e.target.value)}
              placeholder="Type your explanation here..."
            ></textarea>
            <div className="radio-group">
              {["0", "0.25", "0.5"].map((score) => (
                <label key={score}>
                  <input
                    type="radio"
                    name="integrity"
                    value={score}
                    checked={integrity === score}
                    onChange={(e) => setIntegrity(e.target.value)}
                  />
                  {integrityOptions[score]}
                </label>
              ))}
            </div>
          </div>

          {/* Availability Section */}
          <div className="section">
            <h2>Loss of Availability</h2>
            <p>This examines whether data can be accessed when needed.</p>
            <label className="question">
              Why do you assign this Availability score?
            </label>
            <textarea
              value={availText}
              onChange={(e) => setAvailText(e.target.value)}
              placeholder="Type your explanation here..."
            ></textarea>
            <div className="radio-group">
              {["0", "0.25", "0.5"].map((score) => (
                <label key={score}>
                  <input
                    type="radio"
                    name="availability"
                    value={score}
                    checked={availability === score}
                    onChange={(e) => setAvailability(e.target.value)}
                  />
                  {availOptions[score]}
                </label>
              ))}
            </div>
          </div>

          {/* Malicious Intent Section */}
          <div className="section">
            <h2>Malicious Intent</h2>
            <p>
              This evaluates whether the breach was accidental or intentional.
            </p>
            <label className="question">
              Why do you assign this Malicious Intent score?
            </label>
            <textarea
              value={maliciousText}
              onChange={(e) => setMaliciousText(e.target.value)}
              placeholder="Type your explanation here..."
            ></textarea>
            <div className="radio-group">
              {["0", "0.5"].map((score) => (
                <label key={score}>
                  <input
                    type="radio"
                    name="malicious"
                    value={score}
                    checked={malicious === score}
                    onChange={(e) => setMalicious(e.target.value)}
                  />
                  {maliciousOptions[score]}
                </label>
              ))}
            </div>
          </div>
        </div>
        {/* End of Form */}
        <div className="result-container">
          {result && (
            <div className="risk-summary">
              <h2>Risk Summary</h2>
              <p className="formula">
                Formula: SE = (DPC: {result.dpcValue}) x (EI: {result.eiValue})
                + (CB: {result.cbValue})
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Criterion</th>
                    <th>Selected Option</th>
                    <th>Score</th>
                    <th>Description</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>{tableRows}</tbody>
              </table>
              <h3>
                Final Severity Score: {result.severity} -{" "}
                <span style={{ color: getRiskColor(result.level) }}>
                  {result.level}
                </span>
              </h3>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
