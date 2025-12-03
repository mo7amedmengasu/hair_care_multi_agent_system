# Define the schema for SupervisorState
from pydantic import BaseModel
from typing import List, Annotated,Dict
from langgraph.graph import add_messages
from langgraph.graph import StateGraph, END, MessagesState

class SupervisorState(MessagesState):
    """State for the multi-agent system"""
    messages: Annotated[List, add_messages]
    image_path: str = ""
    history: List[Dict[str, str]] = []
    user_query: str = ""
    next_agent: str = ""    
    Images_data: str = ""
    scientific_data: str = ""
    products_data: str = ""
    final_answer: str = ""
    task_complete: bool = False
    current_task: str = ""
    task_related_to_haircare: bool = True