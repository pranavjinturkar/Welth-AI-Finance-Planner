import { getDashboardData, getUserAccounts } from "@/actions/dashboard";
import CreateAccountDrawer from "@/components/CreateAccountDrawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { Suspense } from "react";
import AccountCard from "./_components/AccountCard";
import { getCurrentBudget } from "@/actions/budget";
import BudgetProgress from "./_components/BudgetProgress";
import TransactionOverview from "./_components/TransactionOverview";

const DashboardPage = async () => {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  // console.log(accounts);
  const defaultAccount = accounts?.find((account) => account.isDefault);

  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  // console.log(budgetData);
  

  return (
    <div className="space-y-8">
      {/* Budget Progress */}
      {defaultAccount && (
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      )}

      {/* Overview of the Account */}
      <Suspense fallback={"Loading Overview..."}>
          <TransactionOverview 
            accounts={accounts}
            transactions={transactions || []}
          />
      </Suspense>


      {/* Account's Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
        <CreateAccountDrawer>
          <Card className="hover:shadow-xl shadow-md transition-shadow cursor-pointer border-dashed">
            <CardContent className="flex flex-col justify-center items-center text-muted-foreground h-full pt-5 hover:text-black">
              <Plus className="h-10 w-10 mb-2" />
              <p className="text-sm font-medium">Add new Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {accounts.length > 0 &&
          accounts.map((account) => {
            return <AccountCard key={account.id} account={account} />;
          })}
      </div>
    </div>
  );
};

export default DashboardPage;
