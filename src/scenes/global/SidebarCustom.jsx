import {Menu, MenuItem, Sidebar, SubMenu, useProSidebar,} from "react-pro-sidebar";
import {Box, IconButton, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import {tokens} from "~/theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {sideBarData} from "~/scenes/global/sideBarData";
import {useState} from "react";
import {HomeIcon} from "~/assets/icons/icons";

const Item = ({
    title,
    to,
    icon,
    selected,
    setSelected,
    className,
    itemKey,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            className={className}
            active={selected === title}
            rootStyles={{
                background: `${colors.primary[400]} !important`,
                a: {
                    color: "#868dfb !important",
                },
            }}
            style={{
                color: "#868dfb !important",
                backgroundColor: "transparent",
                "&:hover": {
                    backgroundColor: "transparent !important",
                },
            }}
            onClick={() => setSelected(title)}
            icon={icon}
            component={to ? <Link to={to}></Link> : null}
        >
            {title}
        </MenuItem>
    );
};

const SidebarCustom = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // const [collapsed, collapseSidebar] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const { collapseSidebar, collapsed } = useProSidebar();

    return (
        <Box
            sx={{ backgroundColor: colors.primary[400],
                "& .ps-sidebar-root-test-id" : {
                    backgroundColor: colors.primary[400]
                },
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item:hover": {
                    backgroundColor: "transparent !important",
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <Sidebar
                style={{
                    background: `${colors.primary[400]} !important`
                }}
                collapsed={collapsed}
            >
                <Menu className={"pro-sidebar-inner"} iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        icon={collapsed ? <MenuOutlinedIcon onClick={() => collapseSidebar(!collapsed)} /> : null}
                        style={{
                            color: "red !important",
                            backgroundColor: "transparent",
                            "&:hover": {
                                backgroundColor: "transparent !important",
                            },
                        }}
                    >
                        {!collapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                               <HomeIcon textColor={colors.greenAccent[500]} />
                                <IconButton
                                    onClick={() => collapseSidebar(!collapsed)}
                                >
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {/*{!isCollapsed && (*/}
                    {/*  <Box mb="25px">*/}
                    {/*    <Box display="flex" justifyContent="center" alignItems="center">*/}
                    {/*      <img*/}
                    {/*        alt="profile-user"*/}
                    {/*        width="100px"*/}
                    {/*        height="100px"*/}
                    {/*        src={`../../assets/user.png`}*/}
                    {/*        style={{ cursor: "pointer", borderRadius: "50%" }}*/}
                    {/*      />*/}
                    {/*    </Box>*/}
                    {/*    <Box textAlign="center">*/}
                    {/*      <Typography*/}
                    {/*        variant="h2"*/}
                    {/*        color={colors.grey[100]}*/}
                    {/*        fontWeight="bold"*/}
                    {/*        sx={{ m: "10px 0 0 0" }}*/}
                    {/*      >*/}
                    {/*        Ed Roh*/}
                    {/*      </Typography>*/}
                    {/*      <Typography variant="h5" color={colors.greenAccent[500]}>*/}
                    {/*        VP Fancy Admin*/}
                    {/*      </Typography>*/}
                    {/*    </Box>*/}
                    {/*  </Box>*/}
                    {/*)}*/}

                    <Box paddingLeft={collapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/"
                            className={"pro-inner-item"}
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {/* <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Data
                        </Typography> */}
                        {sideBarData.map((item, index) => {
                            const Icon = item.icon;
                            if (item.subMenu)
                                return (
                                    <SubMenu
                                        rootStyles={{
                                            color: "#868dfb !important",
                                            backgroundColor: "transparent",
                                            "&:hover": {
                                                backgroundColor:
                                                    "transparent !important",
                                            },
                                            div: {
                                                marginLeft: "45px",
                                            },
                                        }}
                                        style={{
                                            color: "#868dfb !important",
                                            backgroundColor: "transparent",
                                            "&:hover": {
                                                backgroundColor:
                                                    "transparent !important",
                                            },
                                        }}
                                        key={index}
                                        icon={<Icon />}
                                        label={item.title}
                                    >
                                        {item.subMenu.map((sub, index) => {
                                            return (
                                                <Item
                                                    to={sub.path}
                                                    key={index}
                                                    title={sub.title}
                                                    selected={selected}
                                                    setSelected={setSelected}
                                                />
                                            );
                                        })}
                                    </SubMenu>
                                );
                            return (
                                <Item
                                    selected={selected}
                                    setSelected={setSelected}
                                    to={item.path && item.path}
                                    key={index}
                                    icon={<Icon />}
                                    title={item.title}
                                />
                            );
                        })}{" "}
                        {/*<Item*/}
                        {/*  title="Manage Team"*/}
                        {/*  to="/team"*/}
                        {/*  icon={<PeopleOutlinedIcon />}*/}
                        {/*  selected={selected}*/}
                        {/*  setSelected={setSelected}*/}
                        {/*/>*/}
                        {/*<Item*/}
                        {/*  title="Contacts Information"*/}
                        {/*  to="/contacts"*/}
                        {/*  icon={<ContactsOutlinedIcon />}*/}
                        {/*  selected={selected}*/}
                        {/*  setSelected={setSelected}*/}
                        {/*/>*/}
                        {/*<Item*/}
                        {/*  title="Invoices Balances"*/}
                        {/*  to="/invoices"*/}
                        {/*  icon={<ReceiptOutlinedIcon />}*/}
                        {/*  selected={selected}*/}
                        {/*  setSelected={setSelected}*/}
                        {/*/>*/}
                        {/*<Typography*/}
                        {/*    variant="h6"*/}
                        {/*    color={colors.grey[300]}*/}
                        {/*    sx={{m: "15px 0 5px 20px"}}*/}
                        {/*>*/}
                        {/*  Pages*/}
                        {/*</Typography>*/}
                        {/*<Item*/}
                        {/*    title="Profile Form"*/}
                        {/*  to="/form"*/}
                        {/*  icon={<PersonOutlinedIcon />}*/}
                        {/*  selected={selected}*/}
                        {/*  setSelected={setSelected}*/}
                        {/*/>*/}
                        {/*<Item*/}
                        {/*  title="Calendar"*/}
                        {/*  to="/calendar"*/}
                        {/*  icon={<CalendarTodayOutlinedIcon />}*/}
                        {/*  selected={selected}*/}
                        {/*  setSelected={setSelected}*/}
                        {/*/>*/}
                        {/*<Item*/}
                        {/*  title="FAQ Page"*/}
                        {/*  to="/faq"*/}
                        {/*  icon={<HelpOutlineOutlinedIcon />}*/}
                        {/*  selected={selected}*/}
                        {/*  setSelected={setSelected}*/}
                        {/*/>*/}
                        {/*<Typography*/}
                        {/*  variant="h6"*/}
                        {/*  color={colors.grey[300]}*/}
                        {/*  sx={{ m: "15px 0 5px 20px" }}*/}
                        {/*>*/}
                        {/*  Charts*/}
                        {/*</Typography>*/}
                        {/*<Item*/}
                        {/*  title="Bar Chart"*/}
                        {/*  to="/bar"*/}
                        {/*  icon={<BarChartOutlinedIcon />}*/}
                        {/*  selected={selected}*/}
                        {/*  setSelected={setSelected}*/}
                        {/*/>*/}
                        {/*<Item*/}
                        {/*  title="Pie Chart"*/}
                        {/*  to="/pie"*/}
                        {/*  icon={<PieChartOutlineOutlinedIcon />}*/}
                        {/*  selected={selected}*/}
                        {/*  setSelected={setSelected}*/}
                        {/*/>*/}
                        {/*<Item*/}
                        {/*  title="Line Chart"*/}
                        {/*  to="/line"*/}
                        {/*  icon={<TimelineOutlinedIcon />}*/}
                        {/*  selected={selected}*/}
                        {/*  setSelected={setSelected}*/}
                        {/*/>*/}
                        {/*<Item*/}
                        {/*  title="Geography Chart"*/}
                        {/*  to="/geography"*/}
                        {/*  icon={<MapOutlinedIcon />}*/}
                        {/*  selected={selected}*/}
                        {/*  setSelected={setSelected}*/}
                        {/*/>*/}
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    );
};

export default SidebarCustom;
