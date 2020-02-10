import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

export const Preloader = () => (
    <div>
        <Segment style={{ position: "absolute", width: "100vw", height: "100vh" }}>
            <Dimmer active>
                <Loader size="massive">Loading</Loader>
            </Dimmer>
        </Segment>
    </div>
);
