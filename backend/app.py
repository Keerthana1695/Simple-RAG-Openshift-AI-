from flask import Flask, request, jsonify
from your_infer_module import infer_with_template  # import your function

app = Flask(__name__)

# Load prompt template at startup
with open("data/template.txt") as f:
    prompt_template = f.read()

@app.route('/query', methods=['POST'])
def query():
    data = request.json
    user_question = data.get("query", "")
    if not user_question:
        return jsonify({"error": "No query provided"}), 400

    # Use your infer function
    answer = infer_with_template(user_question, prompt_template)

    return jsonify({"answer": answer})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)

