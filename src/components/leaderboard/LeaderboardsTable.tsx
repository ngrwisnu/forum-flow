import { LeaderboardType } from "../../types";
import defaultImage from "../../assets/default-image.webp";
import Table, { TableRow } from "../ui/Table";

const LeaderboardsTable = ({ data }: { data: LeaderboardType[] }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <thead>
          <TableRow>
            <th></th>
            <th>Name</th>
            <th>Score</th>
          </TableRow>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <TableRow key={item.user.id}>
              <td>
                <span>{index + 4}</span>
              </td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask h-12 w-12 rounded-full">
                      <img
                        src={item.user.avatar || defaultImage}
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{item.user.name}</div>
                  </div>
                </div>
              </td>
              <td>
                <span>{item.score}</span>
              </td>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LeaderboardsTable;
