import React, { useState } from "react";
import EditQuestion from "./EditQuestion";

function QuesDetails(props) {
  const [showQuesDetails, setShowQuesDetails] = useState(null);
  const question = props.collection;
  console.log("question ......",question)
  return (
    <div>
        {showQuesDetails && showQuesDetails._id === props.ques._id ? (
          <div key={props.ques._id}>
            <EditQuestion
              collection={question}
              setShowDetail={setShowQuesDetails}
            />
          </div>
        ) : (
          <div key={props.ques._id}>
            <table>
                <thead>
                  <hr />
                  <tr>
                    <th>Question Descriptions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{props.ques.question}</td>
                  </tr>
                </tbody>
              <button onClick={() => { setShowQuesDetails(question); props.updateDisplay() }} >View details</button>
            </table>
          </div>
        )
        }
        
        </div>
  );
}

export default QuesDetails;
