import {ArrowBackIos, ArrowForwardIos, NavigateNext} from "@mui/icons-material";
import {Breadcrumbs, IconButton, Link, Stack, useTheme} from "@mui/material";
import React, {useMemo} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {tokens} from "~/theme";

function BreadCrumbs() {
    const location = useLocation();
    const paths = location.pathname.substring(1).split("/");
    const navigate = useNavigate();
    const theme = useTheme();
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
            sx={{cursor: "pointer"}}
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
        <Stack direction={"row"} width={"100%"} alignItems={"center"} justifyContent={"space-between"}>
            <Breadcrumbs
                sx={{paddingLeft: 1}}
                separator={<NavigateNext fontSize="small"/>}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
            <Stack cursor={"pointer"} direction={"row"} spacing={1} paddingX={2}>
                <IconButton  onClick={() => {
                    if (!(location.key === 'default')) navigate(-1)
                }} disabled={location.key === 'default'}>
                    <ArrowBackIos style={{color: colors.pink[400]}} sx={{justifySelf: "flex-end"}}/>
                </IconButton>
                <IconButton onClick={() => {
                    if (!(location.key === 'default')) navigate(+1)
                }} disabled={location.key === 'default'}>
                    <ArrowForwardIos  style={{color: colors.pink[400]}} sx={{justifySelf: "flex-end"}}/>
                </IconButton>
            </Stack>
        </Stack>
    );
}

export default BreadCrumbs;
