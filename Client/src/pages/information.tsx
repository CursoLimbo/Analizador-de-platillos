import React, {useContext} from "react";
import {NavBar} from "@/components/NavBar";
import {useGetManagerQuery, useUpdatePhotoManagerMutation} from "@/hooks/services/manager";
import {ManagerContext, ManagerContextState} from "@/contexts/managerContext";
import {Stack} from "@mui/material";
import styles from "@/styles/login.module.css";
import profileStyles from "@/styles/profile.module.css";
import {useGetCompanyQuery, useUpdatePhotoCompanyMutation} from "@/hooks/services/company";
import CardActions from "@/components/Card";
import {useRouter} from "next/router";

 const Information : React.FC = () => {
     const context = useContext<ManagerContextState>(ManagerContext);
     const managerQuery = useGetManagerQuery();
     const companyQuery = useGetCompanyQuery();
     const [updateManagerMutation] =  useUpdatePhotoManagerMutation();
     const [updateCompanyMutation] = useUpdatePhotoCompanyMutation();
     const managerData = managerQuery.data;
     const companyData = companyQuery.data;
     console.log(managerData);
     console.log(companyData);

     const router = useRouter();
     const param = router.query;
     let isGoingToUpdate : boolean = param.edit !== 'false';

     if(managerQuery.loading || companyQuery.loading) {
         return <span>Loading...</span>
         //todo spinner
     }

     const onImageUploadHandlerManager = (publicId: string) => {
         updateManagerMutation({
             variables: {
                 updateManager: {
                     id: context.id,
                     photo: publicId
                 }
             }
         })
     };

     const onImageUploadHandlerCompany = (publicId: string) => {
         console.log(publicId, "id");
         updateCompanyMutation({
             variables: {
                 updateCompany: {
                     id: companyData.getCompany.id,
                     logo: publicId
                 }
             }
         }).then(() => {
             console.log("Test")
         })
     };


     return <>
         <NavBar isHome={false}></NavBar>
         <Stack direction={"row"}>
             <div className={profileStyles.infoBox}>
                 <CardActions type="personal" title={"Información personal"} name={managerData.getManager.name} email={managerData.getManager.email} phone={managerData.getManager.phone} photo={managerData.getManager.photo} onPictureChanged={onImageUploadHandlerManager} isGoingToUpdate={isGoingToUpdate}></CardActions>
                 <CardActions type="business" title={"Información empresarial"} name={companyData.getCompany.name} email={companyData.getCompany.email} phone={companyData.getCompany.phone} photo={companyData.getCompany.logo} onPictureChanged={onImageUploadHandlerCompany} isGoingToUpdate={isGoingToUpdate}></CardActions>
             </div>
             <div className={styles.banner}/>
         </Stack>
     </>
 }

export default Information;