import styled from 'styled-components';
import Heading from '../../ui/Heading';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useDarkMode } from '../../contexts/darkModeContext';
import { START_DATA_DARK, START_DATA_LIGHT } from '../../utils/globalConstants';
import { prepareData } from '../../utils/helpers';

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

export default function DurationChart({ confirmedStays }) {
  const { darkMode } = useDarkMode();
  const startData = darkMode ? START_DATA_DARK : START_DATA_LIGHT;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            datakey="value"
            paddingAngle={2}
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
          >
            {data.map((entry) => (
              <Cell
                key={entry.color}
                fill={entry.color}
                stroke={entry.color}
              ></Cell>
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}
