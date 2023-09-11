<?php
// Database configuration
$db_host = 'localhost';
$db_name = 'casino';
$db_user = 'root';
$db_pass = '';

//Server config to avoid CORS
header("Access-Control-Allow-Origin: http://127.0.0.1:5501");
header("Access-Control-Allow-Methods: GET, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Create a database connection
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Define API routes
$request_method = $_SERVER['REQUEST_METHOD'];

switch ($request_method) {
    case 'GET':
        // Get user points
        if (isset($_GET['username'])) {
            $username = $conn->real_escape_string($_GET['username']);
            getUserPoints($username);
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Missing username parameter"));
        }
        break;
    case 'PUT':
        // Modify user points
        $data = json_decode(file_get_contents("php://input"));
        if (isset($data->username) && isset($data->points)) {
            $username = $conn->real_escape_string($data->username);
            $points = intval($data->points);
            modifyUserPoints($username, $points);
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Missing username or points parameter"));
        }
        break;
    case 'OPTIONS':
        // Handle preflight request
        header("Access-Control-Allow-Methods: GET, PUT");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        http_response_code(204); // No content
        break;
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Method not allowed"));
        break;
}

function getUserPoints($username)
{
    global $conn;
    $sql = "SELECT points FROM users WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode(array("points" => $row['points']));
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "User not found"));
    }
}

function modifyUserPoints($username, $points)
{
    global $conn;
    $sql = "UPDATE users SET points = points + $points WHERE username = '$username'";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Points modified successfully"));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Error modifying points: " . $conn->error));
    }
}

// Close the database connection
$conn->close();
