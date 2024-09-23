<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us | Swift Peak Hosting Ltd</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.1/flowbite.min.css" rel="stylesheet">
</head>

<body class="bg-gray-900 text-white">
    <!-- Header -->
    <header class="bg-gray-800 p-6">
        <div class="container mx-auto text-center">
            <h1 class="text-4xl font-bold">Contact Us</h1>
            <p class="mt-2 text-lg">We'd love to hear from you!</p>
        </div>
    </header>

    <!-- Contact Information Section -->
    <section class="py-12">
        <div class="container mx-auto">
            <h2 class="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
            <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <p class="mb-2"><strong>Email:</strong> <a href="mailto:swiftpeakhosting@outlook.com" class="text-blue-400 hover:underline">swiftpeakhosting@outlook.com</a></p>
                <p class="mb-2"><strong>Phone:</strong> <a href="tel:+447591217965" class="text-blue-400 hover:underline">+44 7591 217965</a></p>
                <p class="mb-2"><strong>Discord:</strong> <a href="https://discord.gg/ztJ8Y2bKge" class="text-blue-400 hover:underline">Join our Discord</a></p>
            </div>
        </div>
    </section>

    <!-- Contact Form Section -->
    <section class="py-12">
        <div class="container mx-auto">
            <h3 class="text-3xl font-bold mb-8 text-center">Send Us a Message</h3>
            <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
                <form action="contact.php" method="POST"> <!-- Form action points to itself -->
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-bold mb-2">Name:</label>
                        <input type="text" id="name" name="name" required class="border border-gray-700 bg-gray-900 text-white p-2 rounded w-full">
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-bold mb-2">Email:</label>
                        <input type="email" id="email" name="email" required class="border border-gray-700 bg-gray-900 text-white p-2 rounded w-full">
                    </div>
                    <div class="mb-4">
                        <label for="message" class="block text-sm font-bold mb-2">Message:</label>
                        <textarea id="message" name="message" required class="border border-gray-700 bg-gray-900 text-white p-2 rounded w-full" rows="4"></textarea>
                    </div>
                    <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send Message</button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 p-6">
        <div class="container mx-auto text-center">
            <p>&copy; 2024 Swift Peak Hosting Ltd. All rights reserved.</p>
        </div>
    </footer>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.1/flowbite.min.js"></script>

    <?php
    // PHP script to handle form submission
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $message = htmlspecialchars($_POST['message']);
        
        $to = "swiftpeakhosting@outlook.com";
        $subject = "Contact Form Submission from $name";
        $body = "Name: $name\nEmail: $email\nMessage:\n$message";
        $headers = "From: $email";

        if (mail($to, $subject, $body, $headers)) {
            echo "<script>alert('Message sent successfully!');</script>";
        } else {
            echo "<script>alert('Failed to send message.');</script>";
        }
    }
    ?>
</body>

</html>
