import{E as e,x as a,D as t}from"#entry";const d=e((o,i)=>{const s=a();if(!(s.isAuthenticated||s.hasValidSession()))return t("/login");if(!s.isAdmin)return t("/dashboard")});export{d as default};
