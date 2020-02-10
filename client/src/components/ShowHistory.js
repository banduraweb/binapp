import React, { useState } from "react";
import { Button, Icon, Message } from "semantic-ui-react";

export const ShowHistory = ({ historyRecipe }) => {
    const [visibleHistory, setVisibleHistory] = useState([]);

    return (
        <div>
            <Button
                style={{ backgroundColor: "#b0d3bf" }}
                onClick={() => setVisibleHistory(historyRecipe)}
                floated="right"
            >
                See prev versions
            </Button>
            {visibleHistory.length > 0 &&
            visibleHistory.map(
                ({ un_id, title, calories, ingredients, preparation }) => (
                    <Message
                        key={un_id}
                        style={{
                            border: "1px solid #f3f3f3",
                            boxShadow: "0 0 8px 0 #e0e0e0",
                            backgroundColor: "#FFCC66"
                        }}
                    >
                        <Message.Header>
                            <i className="fas fa-utensil-spoon">Recipe</i>&emsp; {title}
                            <br />
                            <i className="fas fa-hamburger">calories</i> &emsp;{calories}
                        </Message.Header>
                        <Message.List>
                            <Message.Item>
                                <Icon name="food" />
                                Ingredients: &emsp;{ingredients}
                            </Message.Item>
                            <Message.Item>
                                <Icon name="american sign language interpreting" />
                                Preparation: &emsp; {preparation}
                            </Message.Item>
                        </Message.List>
                    </Message>
                )
            )}

            {visibleHistory.length > 0 && (
                <Button
                    style={{ backgroundColor: "#b0d3bf" }}
                    onClick={() => {
                        setVisibleHistory([]);
                    }}
                    floated="right"
                >
                    Close previous version
                </Button>
            )}
        </div>
    );
};
