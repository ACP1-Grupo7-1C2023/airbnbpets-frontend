import { useState } from "react";
import { Button, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { HostHeader } from "../components/header/HostHeader";
import { SitterHeader } from "../components/header/SitterHeader";
import { UserType } from "../interfaces/AppInterfaces";
import { useAppSelector } from "../state";
import "../styles/Subscriptions.scss"

const Subs = [
  {
    name: "Basic",
    features: [
      "Access to all the app's features",
      "No ads",
      "Limited to one post or application",
    ],
  },
  {
    name: "Premium",
    features: [
      "Access to all the app's features",
      "No ads",
      "Unlimited posts and applications",
    ],
  }
]

export const Subscriptions = () => {
  const session = useAppSelector(auth => auth.auth.session);
  const [selected, setSelected] = useState<string>("Basic");

  const onSubSelect = (sub: string) => {
    // TODO: integrar api
    setSelected(sub);
  };

  return (
    <main className="subscriptions_container">
      {session?.type === UserType.Host ? (
        <HostHeader />
      ) : (
        <SitterHeader />
      )}
      <div className="subscriptions_list">
        {Subs.map((sub, index) => (
          <Card
            key={index}
            w="340px"
            h="370px"
          >
            <CardBody display="flex" flexDirection="column">
              <Heading size='xl' textAlign="center" textDecoration="underline">{sub.name}</Heading>
              <div className="sub_features">
                {sub.features.map((feature, index) => (
                  <Text key={index} fontSize='lg' className="sub_feature">{feature}</Text>
                ))}
              </div>
              <Button 
                className={`select_sub_btn ${selected === sub.name && "select_sub_btn_disabled"}`}
                onClick={() => onSubSelect(sub.name)}
              >
                <Text fontSize='lg' fontWeight="bold">
                  {selected === sub.name ? "Selected" : "Select"}
                </Text>
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </main>
  );
}
