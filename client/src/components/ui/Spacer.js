import React from "react";
import { Typography } from "@mui/material";

/**
 * Distribute remaining width in-between a parents' child components
 * in a flex layout.
 * @returns {React.Component}
 */
export default function Spacer() {
    return <Typography component="div" sx={{ flexGrow: 1 }}></Typography>;
}