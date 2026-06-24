import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const adminGuard: CanActivateFn = () => {
    const router = inject(Router);
    
    const jsonRoles = localStorage.getItem("roles");
    const parsed = jsonRoles ? JSON.parse(jsonRoles) : [];
    const roles = Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];     

    console.info(roles);
    if(roles.includes("ROLE_ADMIN")) {        
        return true;
    } else {
        router.navigate(['/']);
        return false;
    }
};