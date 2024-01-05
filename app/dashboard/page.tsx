import CardStat from "../components/cards/CardStat";
import GridLayout from "../components/layouts/GridLayout";
import { TbAlarmFilled } from "react-icons/tb";

export default function DashboardHome() {
  return (
    <GridLayout>
      <CardStat
        stat="98%"
        title="Random Stat"
        alt="-£1"
        icon={<TbAlarmFilled />}
      />
    </GridLayout>
  );
}
