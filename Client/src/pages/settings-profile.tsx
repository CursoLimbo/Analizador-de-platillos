import {useGetManagerQuery, useUpdateManagerMutation} from "../hooks/services/manager";
import {useGetCompanyQuery, useUpdateCompanyMutation} from "../hooks/services/company";
import {AuthGate} from "../core/AuthGate";
import {Stack} from "@mui/material";
import profileStyles from "@/styles/profile.module.css";
import styles from "@/styles/login.module.css";
import React from "react";
import Updatecard from "../components/Updatecard";

const SettingsProfile : React.FC = () => {
    const managerQuery = useGetManagerQuery();
    const managerData = managerQuery.data;
    const companyQuery = useGetCompanyQuery();
    const companyData = companyQuery.data;
    const [updateManager] = useUpdateManagerMutation();
    const [updateCompany] = useUpdateCompanyMutation();


    const updateManagerInformation = (data: any) => {
        updateManager ( {
            variables: {
                updateManager: {
                    id: managerData.getManager.id,
                    ...data
                }
            }
        });
    }

    const updateCompanyInformation = (data: any) => {
        updateCompany({
            variables:{
                updateCompany: {
                    id: companyData.getCompany.id,
                    ...data
                }
            }
        });
    }

    if(!managerQuery.data || !companyQuery.data) {
        return <span>Loading...</span>
    }


    return<>
        <AuthGate>
            <Stack direction={"row"}>
                <div className={profileStyles.infoBox}>
                    <Updatecard type="personal"
                                     title={"Información personal"}
                                     name={managerData.getManager.name}
                                     email={managerData.getManager.email}
                                     phone={managerData.getManager.phone}
                                     photo={managerData.getManager.photo}
                                     whatsapp={managerData.getManager.whatsapp}
                                    updateInformation={updateManagerInformation}
                    >
                    </Updatecard>
                    <Updatecard type="business"
                                     title={"Información de la empresa"}
                                     name={companyData.getCompany.name}
                                     email={companyData.getCompany.email}
                                     phone={companyData.getCompany.phone}
                                     photo={companyData.getCompany.logo}
                                     whatsapp={companyData.getCompany.whatsapp}
                                     updateInformation={updateCompanyInformation}
                    >
                    </Updatecard>
                </div>
                <div className={styles.banner}/>
            </Stack>
        </AuthGate>
    </>
}

export default SettingsProfile;