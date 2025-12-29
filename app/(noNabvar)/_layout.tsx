import { MatrixProvider } from "@/src/matrix/matrixProvider";
import { Slot } from "expo-router";

export default function noNabvarLayout() {
    
    return(

        <MatrixProvider>
        <Slot />; 
    </MatrixProvider>
    )
}