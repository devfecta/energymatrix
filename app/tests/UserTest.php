<?php 
declare(strict_types=1);
require_once('./configuration/User.php');
use PHPUnit\Framework\TestCase;

final class UserTest extends TestCase
{
    private $user;

    public function testGetCompanies(): void
    {
        $user = new User();

        $this->assertInstanceOf(User::class, User::getUser(2));

        //$this->assertEquals("Test Company", $users->getCompanies()[0]->getCompany());
    }
    
}
?>