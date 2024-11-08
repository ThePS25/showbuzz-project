import { Navigate, useLocation } from "react-router-dom";

// import { defaultRoutes } from "../constants/routes";

import { authService } from "./auth-service";
// import { useCurrentUser } from "../hooks";

interface AuthRouteProps {
	component: React.FC;
}

export const AuthRoute = ({ component: Component }: AuthRouteProps) => {
	// const { user } = useCurrentUser();
	// const { pathname } = useLocation();

	// if (authService.isAuthenticated()) {
	// 	if (user?.tenant?.status === "Onboarding" && pathname !== "/tenant-onboarding") {
	// 		return <Navigate to="/tenant-onboarding" replace />;
	// 	} else if (user?.is_super || user?.tenant?.status === "Active") {
	// 		return <Navigate to={defaultRoutes["HOME"].route} replace />;
	// 	}
	// }
	return <Component />;
};
