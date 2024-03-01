
 const methods = {
    POST: "POST",
    GET: "GET",
    PUT: "PUT",
    DELETE: "DELETE",
  };

   const roles = {
    OWNER:"owner",
    SALES:"sales"
  };

   const routes = {
    ROOT: "/",
    RESET_PASSWORD:"/user_auth/resetpassword",
    DASHBOARD:"/admin/dashboard",
    CATEGORIES: "/admin/categories",
    MANAGER: "/admin/manager",
    MANAGE_ORDER: "/admin/manageorder",
    ADMIN_PROFILE: "/admin/viewProfile",
    PAYMENT_HISTORY: "/admin/paymenthistory",
    LEADS: "/admin/leads",
    RESTAURANT: "/admin/restaurant",
    RESTAURANT_DETAIL: "/admin/restaurantdetail/",
    KDS_SCREEN: "/kds/kdsScreen",
    SUBSCRIPTION: "/subscription/page",
    REORDER:"admin/categories/reorder",
    ADMIN:"admin/allmedia"
  };

  Object.freeze(roles)
  Object.freeze(routes)

 export {routes, roles, methods}
