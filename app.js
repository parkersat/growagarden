function toggleSelection(element) {
            element.classList.toggle('selected');
            clearSelectionError();
        }

        function clearUsernameError() {
            document.getElementById('username-error').textContent = '';
        }

        function clearSelectionError() {
            document.getElementById('selection-error').textContent = '';
        }

        function generateGamepass() {
            const username = document.getElementById('username').value.trim();
            const selectedItems = document.querySelectorAll('.gamepass-item.selected');
            
            let hasError = false;

            // Clear previous errors
            clearUsernameError();
            clearSelectionError();

            // Validate username
            if (username.length === 0) {
                document.getElementById('username-error').textContent = 'Please enter your username and it must be 3 characters';
                hasError = true;
            } else if (username.length < 3) {
                document.getElementById('username-error').textContent = 'Please enter your username and it must be 3 characters';
                hasError = true;
            }

            // Validate selection
            if (selectedItems.length === 0) {
                document.getElementById('selection-error').textContent = 'Please select 1 item';
                hasError = true;
            }

            // If no errors, show loading modal first
            if (!hasError) {
                showLoadingModal(username);
            }
        }

        function showLoadingModal(username) {
            document.getElementById('loadingText').textContent = `Looking for ${username}`;
            document.getElementById('loadingModal').style.display = 'block';
            
            // After 3 seconds, hide loading modal and show verification modal
            setTimeout(() => {
                document.getElementById('loadingModal').style.display = 'none';
                document.getElementById('verificationModal').style.display = 'block';
            }, 3000);
        }

        function closeModal() {
            document.getElementById('verificationModal').style.display = 'none';
            document.getElementById('loadingModal').style.display = 'none';
        }

        // Update the window click event to handle both modals
        window.addEventListener('click', function(event) {
            const verificationModal = document.getElementById('verificationModal');
            const loadingModal = document.getElementById('loadingModal');
            
            if (event.target === verificationModal) {
                closeModal();
            }
            // Don't allow closing loading modal by clicking outside
        });

        // Clear username error when user starts typing
        document.getElementById('username').addEventListener('input', function() {
            if (this.value.length >= 3) {
                clearUsernameError();
            }
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('verificationModal');
            if (event.target === modal) {
                closeModal();
            }
        });

        // Enter key support
        document.getElementById('username').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                generateGamepass();
            }
        });