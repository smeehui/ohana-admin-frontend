const toVietnameseBreadcrums = (path)=>{
    let vn = (()=>{
        switch (path) {
            case  "dashboard":
                return "tổng quan";
            case  "posts":
                return "danh sách bài viết";
            case "users":
                return "danh sách người dùng";
            case "utilities":
                return "danh sách tiện ích";
            case "categories":
                return "danh sách danh mục phòng";
            case "reports":
                return "thống kê, báo cáo"
            default:
                return "";

        }
    })()
    return vn.charAt(0).toUpperCase() + vn.substring(1);
};
export default toVietnameseBreadcrums;