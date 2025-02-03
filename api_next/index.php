<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
$path = explode('/', trim($_SERVER['REQUEST_URI'], '/')); // Remove barras extras no início e fim



switch ($method) {
    case "GET":
        $sql = "SELECT * FROM users";
        $id = isset($path[2]) && is_numeric($path[2]) ? $path[2] : null;

		//print_r($id);

        if ($id) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($users);
        break;

    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO users(name, email, mobile, created_at) VALUES(:name, :email, :mobile, :created_at)";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':created_at', $created_at);

        $response = ($stmt->execute())
            ? ['status' => 1, 'message' => 'Record created successfully.']
            : ['status' => 0, 'message' => 'Failed to create record.'];

        echo json_encode($response);
        break;

    case "PUT":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE users SET name = :name, email = :email, mobile = :mobile, updated_at = :updated_at WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $user->id, PDO::PARAM_INT);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':updated_at', $updated_at);

        $response = ($stmt->execute())
            ? ['status' => 1, 'message' => 'Record updated successfully.']
            : ['status' => 0, 'message' => 'Failed to update record.'];

        echo json_encode($response);
        break;

    case "DELETE":
        $id = isset($path[2]) && is_numeric($path[2]) ? $path[2] : null;

        if ($id) {
            $sql = "DELETE FROM users WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            $response = ($stmt->execute())
                ? ['status' => 1, 'message' => "Record deleted successfully. ID: $id"]
                : ['status' => 0, 'message' => 'Failed to delete record.'];
        } else {
            $response = ['status' => 0, 'message' => 'Invalid ID.'];
        }

        echo json_encode($response);
        break;
}