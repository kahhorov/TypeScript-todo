import { useContext } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { MoreHorizontalIcon } from "lucide-react";
import { TodoContext } from "../../context/DataContext";
import { Badge } from "../ui/badge";

export function TableFn() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("Xatolik bor!");
  }
  const { todo, setTodo } = context;

  function handleDelete(id: string | number) {
    setTodo((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      localStorage.setItem("todos", JSON.stringify(updated));
      return updated;
    });
  }

  function handleDone(id: string | number) {
    if (!todo) return;

    const newTodo = todo.map((t) =>
      t.id === id ? { ...t, isDone: !t.isDone } : t,
    );

    setTodo(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Work</TableHead>
          <TableHead>Time</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      {/* body */}
      <TableBody>
        {todo?.map((t) => {
          return (
            <TableRow
              key={t.id}
              className={`relative ${t.isDone ? "w-full bg-green-400/10 px-2 py-1 font-medium text-green-400 inset-ring inset-ring-green-500/20 hover:bg-green-400/10" : ""}`}
            >
              <TableCell className="font-medium">{t.text}</TableCell>
              <TableCell>{t.time}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDone(t.id)}>
                      Done
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              {t.isDone && (
                <Badge className="inline-flex items-center rounded-4xl bg-yellow-400/20 px-3 py-1 text-xs font-medium text-yellow-500 inset-ring inset-ring-yellow-400/20 absolute right-10 top-2.5">
                  Done
                </Badge>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
