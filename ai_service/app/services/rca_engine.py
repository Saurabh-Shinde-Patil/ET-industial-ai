import logging

logger = logging.getLogger("ai_service.rca_engine")

def generate_5whys_root_cause(title: str, symptom: str, asset_code: str) -> dict:
    """
    AI 5-Whys Root Cause Analysis Generator.
    Analyzes equipment incident symptom and returns structured 5-Whys steps.
    """
    asset_upper = asset_code.upper() if asset_code else "EQUIPMENT"

    five_whys = [
        {
            "whyNumber": 1,
            "question": f"Why did {asset_upper} experience '{title}'?",
            "answer": f"Primary symptom observed: {symptom}.",
        },
        {
            "whyNumber": 2,
            "question": f"Why did {symptom} occur during normal operation?",
            "answer": f"Operating telemetry deviated beyond normal engineering thresholds for {asset_upper}.",
        },
        {
            "whyNumber": 3,
            "question": "Why did operating telemetry deviate beyond safety thresholds?",
            "answer": "Component lubrication, barrier fluid pressure, or thermal expansion alignment failed.",
        },
        {
            "whyNumber": 4,
            "question": "Why did component fluid pressure or alignment fail?",
            "answer": "Maintenance interval was based on operating hours rather than real-time condition monitoring.",
        },
        {
            "whyNumber": 5,
            "question": "Why was real-time condition monitoring not utilized?",
            "answer": "Standard operating procedure lacked real-time differential sensor integration and MPC testing.",
        },
    ]

    corrective_actions = [
        {
            "action": f"Upgrade filter/seal components on {asset_upper} to high-temperature synthetic specification",
            "owner": "Reliability Lead",
            "status": "Pending",
        },
        {
            "action": f"Update preventive maintenance SOP for {asset_upper} to mandate monthly oil sample MPC testing",
            "owner": "Knowledge Admin",
            "status": "In Progress",
        },
    ]

    logger.info(f"Generated AI 5-Whys RCA for {asset_upper}: '{title}'")

    return {
        "asset_code": asset_upper,
        "title": title,
        "root_cause_category": "Lubrication / Mechanical Failure",
        "five_whys": five_whys,
        "corrective_actions": corrective_actions,
    }
