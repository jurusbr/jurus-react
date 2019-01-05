import React from "react";
import "./QuickViewer.css";

const QuickViewer = (props) => {

    let data = props.data;
    let assets = props.data.assets.map((a, i) => {
        return (
            <tr key={i} >
                <td>{a.tipo}</td>
                <td>{a.texto}</td>
            </tr>);
    });


    return (
        <div className="quickviwer">
            <h4 className="recommend-title">Melhores <strong>{data.type}</strong> hoje</h4>
            <table className="list-recommend">
                <tbody>
                    {assets}
                </tbody>
            </table>
        </div>
    );

}

export default QuickViewer;
