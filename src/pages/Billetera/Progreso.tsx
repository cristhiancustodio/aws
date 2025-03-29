import React from "react";
import { AbsoluteCenter, ProgressCircle } from "@chakra-ui/react";


export default function Progreso({ valor }: { valor: number }) {

    

    return (
        <ProgressCircle.Root size="xl" value={valor}>
            <ProgressCircle.Circle>
                <ProgressCircle.Track />
                <ProgressCircle.Range strokeLinecap="round" />
            </ProgressCircle.Circle>
            <AbsoluteCenter>
                <ProgressCircle.ValueText />
            </AbsoluteCenter>
        </ProgressCircle.Root>
    )
}