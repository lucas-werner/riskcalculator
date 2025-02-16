# Data Breach Severity Calculator

This is a React-based application that provides a quantitative tool to assess the severity of a data breach. The risk score is calculated using the formula:

**SE = DPC x EI + CB**

Where:
- **DPC (Data Processing Context):** Evaluates the type of data involved in the breach.
- **EI (Ease of Identification):** Determines how easily an individual can be identified from the data.
- **CB (Circumstances of the Breach):** Combines factors such as confidentiality, integrity, availability, and malicious intent.

The app is styled with a professional green theme and includes "Know More" sections that reveal example information to help users understand each option.

## Features

- **Interactive UI:** Built with React and styled with custom CSS.
- **Descriptive Inputs:** Each dropdown is accompanied by explanations and additional examples.
- **Dynamic Calculation:** Displays the formula with computed values and color-codes the risk level (green for Low, yellow for Medium, red for High/Very High).
- **Methodology Derived from ENISA:** Based on the official guidelines, with a link to the original report for further details.

## Live Demo

Access the live application here:  
[Data Breach Severity Calculator](https://lucas-werner.github.io/databreach)

## Installation

To run the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/databreach.git