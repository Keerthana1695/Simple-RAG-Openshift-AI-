from langchain.llms import HuggingFaceTextGenInference
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

INFERENCE_SERVER_URL = "http://llm.ic-shared-llm.svc.cluster.local:3000"
MAX_NEW_TOKENS = 512
TOP_K = 10
TOP_P = 0.95
TYPICAL_P = 0.95
TEMPERATURE = 0.01
REPETITION_PENALTY = 1.03

def infer_with_template(input_text, template):
    llm = HuggingFaceTextGenInference(
        inference_server_url=INFERENCE_SERVER_URL,
        max_new_tokens=MAX_NEW_TOKENS,
        top_k=TOP_K,
        top_p=TOP_P,
        typical_p=TYPICAL_P,
        temperature=TEMPERATURE,
        repetition_penalty=REPETITION_PENALTY,
        streaming=False,  # Set False for API return
        verbose=False,
    )
    
    PROMPT = PromptTemplate.from_template(template)
    llm_chain = LLMChain(llm=llm, prompt=PROMPT)
    
    return llm_chain.run(input_text)
