from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
import os
from graph import workflow_graph 
from langchain_core.messages import HumanMessage
from pydantic import BaseModel
from models import SupervisorState

router = APIRouter()

class TaskRequest(BaseModel):
    task: str
    image_path: str
    history: list

@router.post("/get-final-answer")
def get_final_answer(request: TaskRequest):
    """API endpoint to get the final answer from the workflow graph."""
    try:
        # Invoke the workflow graph with the provided task
        state = SupervisorState({
            "messages":[HumanMessage(content=request.task)],
            "next_agent":"task_classifier_agent",
            "image_path": request.image_path,
            "history": request.history,
            "user_query": request.task
        })
        response = workflow_graph.invoke(state)

        # Extract the final answer from the response
        final_answer = response.get("final_answer", "No final answer available.")

        return {"final_answer": final_answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    try:
        images_dir = os.path.join(os.path.dirname(__file__), 'images')
        os.makedirs(images_dir, exist_ok=True)

        # Sanitize filename (basic)
        filename = os.path.basename(file.filename)
        save_path = os.path.join(images_dir, filename)

        with open(save_path, 'wb') as out_file:
            content = await file.read()
            out_file.write(content)

        rel_path = f"images/{filename}"
        return JSONResponse({"image_path": rel_path})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
