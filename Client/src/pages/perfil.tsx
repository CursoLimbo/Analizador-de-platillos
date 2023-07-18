import React from "react";
import {
    useGetManagerQuery,
    useUpdatePhotoManagerMutation
} from "../hooks/services/manager";

import {Stack} from "@mui/material";
import styles from "@/styles/login.module.css";
import profileStyles from "@/styles/profile.module.css";
import {useGetCompanyQuery, useUpdatePhotoCompanyMutation} from "../hooks/services/company";
import {AuthGate} from "../core/AuthGate";
import InformationCard from "../components/InformationCard";

 const Perfil : React.FC = () => {
     const managerQuery = useGetManagerQuery();
     const managerData = managerQuery.data;
     const companyQuery = useGetCompanyQuery();
     const companyData = companyQuery.data;
     const [updatePhotoManagerMutation] =  useUpdatePhotoManagerMutation();
     const [updatePhotoCompanyMutation] = useUpdatePhotoCompanyMutation();

     const onImageUploadHandlerManager = (publicId: string) => {
         updatePhotoManagerMutation({
             variables: {
                 updateManager: {
                     id: managerData?.getManager.id,
                     photo: publicId
                 }
             }
         })
     };

     const onImageUploadHandlerCompany = (publicId: string) => {
         updatePhotoCompanyMutation({
             variables: {
                 updateCompany: {
                     id: companyData?.getCompany.id,
                     logo: publicId
                 }
             }
         }).then()
     };


     if(!managerQuery.data || !companyQuery.data) {
         return <span>Loading...</span>
     }

     return <>
         <AuthGate>
         <Stack direction={"row"}>
             <div className={profileStyles.infoBox}>
                 <InformationCard type="personal"
                              title={"Información personal"}
                              name={managerData.getManager.name}
                              email={managerData.getManager.email}
                              phone={managerData.getManager.phone}
                              photo={managerData.getManager.photo}
                              onPictureChanged={onImageUploadHandlerManager}
                              whatsapp={managerData.getManager.whatsapp}>
                 </InformationCard>
                 <InformationCard type="business"
                                  title={"Información de la empresa"}
                                  name={companyData.getCompany.name}
                                  email={companyData.getCompany.email}
                                  phone={companyData.getCompany.phone}
                                  photo={companyData.getCompany.logo}
                                  onPictureChanged={onImageUploadHandlerCompany}
                                  whatsapp={companyData.getCompany.whatsapp}>
                 </InformationCard>
             </div>
             <div className={styles.banner}/>
         </Stack>
         </AuthGate>
     </>
 }

export default Perfil;