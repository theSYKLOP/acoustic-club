import{E as t,x as o,D as s}from"#entry";const u=t((a,r)=>{const e=o();if(!(e.isAuthenticated||e.hasValidSession()))return s("/login");if(!e.isServeur)return s("/dashboard")});export{u as default};
