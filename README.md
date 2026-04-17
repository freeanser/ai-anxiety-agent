# Gemini Anxiety Management Agent

#### First Page
![first_page](next-app/assets/first_page.png)

#### Room View
![room_view](next-app/assets/room_view.png)

**Regain your focus and peace of mind through AI-driven automation.**

In an era of information overload and rapid AI advancement, "AI Anxiety" is real. This project is a specialized **Gemini-powered automation agent** designed to help users manage stress, filter digital noise, and provide actionable insights to turn anxiety into productivity.

---

## Key Features

* **Smart Anxiety Filtering:** Automatically categorizes stressors and prioritizes them using Gemini's advanced reasoning.
* **Proactive Automation:** Don't just talk to a chatbot; this agent automates the "next steps" to reduce your mental load.
* **Emotional Trend Analysis:** Tracks your input over time to identify triggers and suggest personalized coping strategies.
* **Gemini 1.5 Flash Integration:** Optimized for speed and responsiveness, ensuring support is there exactly when you need it.

## Hybrid Routing & Guardrails
To ensure stable, high-quality output even when facing unstructured noise or emotional input, this project implements a two-stage AI routing architecture:
![planning_page](next-app/assets/planning.png)

* *Note: Yellow highlights indicate simulated emotions used for testing system robustness.*

* **Intent Extraction:** The initial classifier cold-filters through emotions to precisely identify the user's core objectives (e.g., specific career goals).

* **Expert Guardrails:** Based on the identified intent, the system dynamically injects domain-specific rules. This blocks meaningless AI slogans and ensures the final output consists of specialized, actionable steps.

## Getting Started

### Prerequisites

* A Google AI Studio API Key. [Get it here](https://aistudio.google.com/).
* Python 3.10+ or Node.js (depending on your implementation).

### Installation

```bash
git clone https://github.com/your-username/gemini-anxiety-agent.git
cd gemini-anxiety-agent
pip install -r requirements.txt

```

### Configuration

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_api_key_here

```


## License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Built with ❤️ for a calmer digital world.**
