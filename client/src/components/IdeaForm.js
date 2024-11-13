import IdeasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";

class IdeaForm {
  constructor() {
    this._formModal = document.getElementById("form-modal");
    this._ideaList = new IdeaList();
  }

  // Render the form, ensuring that the username field is populated from localStorage
  render = () => {
    const username = localStorage.getItem('username') || ''; // Get username from localStorage or use empty string
    this._formModal.innerHTML = `
        <form id="idea-form">
        <div class="form-control">
        <label for="idea-text">Enter a Username</label>
        <input type="text" name="username" id="username" value="${username}"/>
        </div>
        <div class="form-control">
        <label for="idea-text">What's Your Idea?</label>
        <textarea name="text" id="idea-text"></textarea>
        </div>
        <div class="form-control">
        <label for="tag">Tag</label>
        <input type="text" name="tag" id="tag" />
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
        </form>
        `;
    this._form = document.getElementById("idea-form");
    this.addEventListeners();
  };

  // Handle the form submission
  handleSubmit = async (e) => {
    e.preventDefault();

    // Get and trim input values
    const username = this._form.elements.username.value.trim();
    const text = this._form.elements.text.value.trim();
    const tag = this._form.elements.tag.value.trim();

    // Validate form fields
    if (!username || !text || !tag) {
        alert('Please enter all fields!');
        return;
    }

    // Save user to local storage
    localStorage.setItem('username', username);

    try {
        // Add idea to server
        const newIdea = await IdeasApi.createIdea({ username, text, tag });

        // Add idea to the list in the UI
        this._ideaList.addIdeaToList(newIdea.data.data);  // Assuming newIdea.data.data is the idea object

        // Clear the form
        this._form.reset();  // Clear all form fields

        // Close modal
        document.dispatchEvent(new Event("closeModal"));
    } catch (error) {
        console.error('Error submitting the form:', error);
        alert('Something went wrong while submitting your idea!');
    }
};

  // Add event listeners
  addEventListeners = () => {
    this._form.addEventListener("submit", this.handleSubmit);
  };
}

export default IdeaForm;
