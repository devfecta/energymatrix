<?php 
declare(strict_types=1);
require_once('./configuration/Users.php');
use PHPUnit\Framework\TestCase;

final class UsersTest extends TestCase
{
    private $users;

    public function testGetCompanies(): void
    {
        $users = new Users();
        $this->assertIsArray($users->getCompanies());

        $this->assertInstanceOf(User::class, $users->getCompanies()[0]);

        $this->assertEquals("Test Company", $users->getCompanies()[0]->getCompany());
    }
    
}
?>