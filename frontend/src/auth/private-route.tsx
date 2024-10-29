import { Navigate } from "react-router-dom";

// import { useCurrentUser } from "../hooks";
// import PrivateLayout from "../components/layouts/private-layout";

import { authService } from "./auth-service";

interface PrivateRouteProps {
	component: React.FC;
}

export const PrivateRoute = ({ component: Component }: PrivateRouteProps) => {
	// const { user } = useCurrentUser();

	// if (authService.isAuthenticated()) {
	// 	if (user?.tenant?.status === "Onboarding") {
	// 		return <Navigate to="/tenant-onboarding" replace />;
	// 	} else {
	// 		return (
	// 			// <PrivateLayout>
	// 			// 	<Component />
	// 			// </PrivateLayout>
	// 			<></>
	// 		);
	// 	}
	// } else {
		return <Navigate to="/" replace />;
	// }
};
