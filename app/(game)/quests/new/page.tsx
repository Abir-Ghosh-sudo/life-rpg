export default function NewQuestPage() {
  return (
    <section>
      <h1>Create a New Quest</h1>
      <p>Add a real-life task and turn it into an RPG quest.</p>

      <form>
        <div>
          <label htmlFor="title">Quest title</label>
          <br />
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Example: Finish assignment"
          />
        </div>

        <br />

        <div>
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            id="description"
            name="description"
            placeholder="Describe what you need to complete"
          />
        </div>

        <br />

        <div>
          <label htmlFor="category">Category</label>
          <br />
          <select id="category" name="category">
            <option>Study</option>
            <option>Work</option>
            <option>Health</option>
            <option>Personal</option>
          </select>
        </div>

        <br />

        <div>
          <label htmlFor="difficulty">Difficulty</label>
          <br />
          <select id="difficulty" name="difficulty">
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
            <option>Epic</option>
          </select>
        </div>

        <br />

        <div>
          <label htmlFor="xp">XP reward</label>
          <br />
          <input
            id="xp"
            name="xp"
            type="number"
            placeholder="Example: 50"
          />
        </div>

        <br />

        <button type="submit">Create Quest</button>
      </form>

      <p>
        <a href="/quests">Back to quests</a>
      </p>
    </section>
  );
}