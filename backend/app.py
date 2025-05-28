from flask import Flask, request, jsonify
import pickle
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceEmbeddings

app = Flask(__name__)

# Load FAISS index from local pickle
with open("vector_index.pkl", "rb") as f:
    vectorstore = pickle.load(f)

@app.route("/query", methods=["POST"])
def query():
    user_query = request.json["query"]
    docs = vectorstore.similarity_search(user_query, k=3)
    answers = [doc.page_content for doc in docs]
    return jsonify({"results": answers})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
