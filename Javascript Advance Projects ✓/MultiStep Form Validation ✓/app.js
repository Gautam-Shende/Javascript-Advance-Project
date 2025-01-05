
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("multiStepForm");
    const formSteps = document.querySelectorAll(".form-step");
    const nextButtons = document.querySelectorAll(".next-btn");
    const prevButtons = document.querySelectorAll(".prev-btn");
    let currentStep = 0;

    nextButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (validateForm(currentStep)) {
                currentStep++;
                updateFormSteps();
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener("click", () => {
            currentStep--;
            updateFormSteps();
        });
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validateForm(currentStep)) {
            alert("Form submitted successfully!");
            form.reset();
            currentStep = 0;
            updateFormSteps();
        }
    });

    function updateFormSteps() {
        formSteps.forEach((step, index) => {
            step.classList.toggle("active", index === currentStep);
        });
    }

    function validateForm(step) {
        const inputs = formSteps[step].querySelectorAll("input");
        let isValid = true;

        inputs.forEach(input => {
            const errorMessage = input.nextElementSibling;
            if (!input.checkValidity()) {
                errorMessage.style.display = "block";
                isValid = false;
            } else {
                errorMessage.style.display = "none";
            }
        });

        return isValid;
    }
});
