import Leaders from "../components/leaders";
import TeamForm from "../components/form";
import Standings from "../components/standings_bug";

export default function Home() {
  return (
    <main className="flex flex-row p-8 space-x-2">
      <Leaders />
      <div className="flex flex-col space-y-2">
        <Standings />
        <TeamForm />
      </div>
    </main>
  );
}
