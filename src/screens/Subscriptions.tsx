import { useState } from "react";
import { Button, Card, CardBody, Heading, Text, useToast } from "@chakra-ui/react";
import { HostHeader } from "../components/header/HostHeader";
import { SitterHeader } from "../components/header/SitterHeader";
import { SubType, UserType } from "../interfaces/AppInterfaces";
import { useAppDispatch, useAppSelector } from "../state";
import "../styles/Subscriptions.scss"
import api from "../api";
import { logout } from "../state/actions";

const Subs = [
  {
    id: SubType.Basic,
    name: "Basic",
    features: [
      "Access to all the app's features",
      "No ads",
      "Limited to one post or application",
    ],
  },
  {
    id: SubType.Premium,
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
  const [selected, setSelected] = useState<string>(session?.subscription || SubType.Basic);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const dispatch = useAppDispatch();

  const onSubSelect = async (sub: string) => {
    if (sub === selected) return;
    setSelected(sub);
    setLoading(true);
    try {
      await api.post('/subscription', { email: session?.email, type: session?.type }, {
        headers: { 'Authorization': `Bearer ${session?.token}` }
      });
      setLoading(false);
      toast({ title: 'Subscription upgraded successfully!', status: 'success' });
    } catch (error: any) {
      if (error?.response && error.response.data.code === 401) {
        dispatch(logout());
      } else {
        setLoading(false);
        toast({ title: 'Something went wrong, try again later', status: 'error' });
      }
    }
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
              {sub.name !== "Basic" && (
                <Button 
                  className={`select_sub_btn ${selected === sub.name && "select_sub_btn_disabled"}`}
                  onClick={() => onSubSelect(sub.name)}
                  isLoading={loading}
                >
                  <Text fontSize='lg' fontWeight="bold">
                    {selected === sub.name ? "Selected" : "Upgrade"}
                  </Text>
                </Button>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </main>
  );
}
