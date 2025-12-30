import { MatrixProvider } from "@/src/matrix/matrixProvider";
import { Slot } from "expo-router";

export default function conversationChatlayot() {
    
    return(
        <MatrixProvider>
        <Slot />; 
    </MatrixProvider>
    )
}