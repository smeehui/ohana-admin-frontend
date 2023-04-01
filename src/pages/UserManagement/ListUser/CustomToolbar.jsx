import { Remove } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import React, { memo } from "react";

function CustomToolbar({ selectedRows, colors }) {
    const toolStyle = { color: colors.greenAccent[300] };
    console.log(selectedRows);
    return (
        <GridToolbarContainer className="d-flex justify-content-between">
            <div>
                <GridToolbarColumnsButton style={toolStyle} />
                <GridToolbarFilterButton style={toolStyle} />
                <GridToolbarDensitySelector style={toolStyle} />
            </div>
            <div>
                <GridToolbarQuickFilter debounceMs={500} />
                {selectedRows && selectedRows.length > 0 && (
                    <Button
                        className="align-self-end"
                        endIcon={<Remove />}
                        color="error"
                        variant="contained"
                    >
                        Delete
                    </Button>
                )}
            </div>
        </GridToolbarContainer>
    );
}

export default memo(CustomToolbar);
