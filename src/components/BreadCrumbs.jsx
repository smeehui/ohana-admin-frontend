import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Link, useTheme } from "@mui/material";
import React from "react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "~/theme";

function BreadCrumbs() {
    const paths = useLocation().pathname.substring(1).split("/");
    const navigate = useNavigate();
    const theme =  useTheme();
    const colors = tokens(theme);
    const onClick = useMemo(
        () => (e, index) => {
            e.preventDefault();
            const currentPath = paths
                .filter((path, i) => i <= index)
                .reduce((acc, curr) => acc + "/" + curr, "");
            navigate(currentPath);
        },
        [paths],
    );

    const breadcrumbs = paths.map((path, index) => (
        <Link
            underline="hover"
            sx={{ cursor: "pointer" }}
            key={index}
            fontWeight={700}
            color={
                paths[paths.length - 1] === path ? colors.pink[400] : "inherit"
            }
            onClick={(e) => onClick(e, index)}
        >
            {path}
        </Link>
    ));
    return (
        <Breadcrumbs
            sx={{paddingLeft: 1}}
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
        >
            {breadcrumbs}
        </Breadcrumbs>
    );
}

export default BreadCrumbs;
