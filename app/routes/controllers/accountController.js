import * as accountService from "../../services/accountService.js";

const addAccount = async ({ request, response, state }) => {
    if (await state.session.get("authenticated")) {
        const user = await state.session.get("user");

        const body = request.body();
        const params = await body.value;

        const name = params.get("name");

        await accountService.addAccount(name, user.id);
        response.redirect("/accounts");
    } else {
        response.status = 401;
    }
};

const listAccounts = async ({ render, response, state }) => {
    if (await state.session.get("authenticated")) {
        const user = await state.session.get("user");
        const accounts = await accountService.findAccountsForUser(user.id);
        render("accounts.eta", { accounts: accounts });
    } else {
        response.status = 401;
    }
};

const showAccount = async ({ params, render, response, state }) => {
    const user = await state.session.get("user");

    const accounts = await accountService.findAccountForUser(params.id, user.id);
    if (accounts.length === 0) {
        response.status = 401;
    } else {
        render("account.eta", accounts[0]);
    }
};

const depositIntoAccount = async ({ params, request, response, state }) => {
    if (await state.session.get("authenticated")) {
        const user = await state.session.get("user");

        const body = request.body();
        const paramsForm = await body.value;

        const amount = parseFloat(paramsForm.get("amount"))

        const account = await accountService.getAccountById(params.id);
        if (!account || account.user_id !== user.id) {
            response.status = 401;
            response.body = "You cannot deposit into someone else's account.";
            return;
        }

        await accountService.depositIntoAccountForUser(params.id, user.id, amount);
        response.redirect("/accounts");
    } else {
        response.status = 401;
    }
};

const withdrawFromAccount = async ({ params, request, response, state }) => {
    if (await state.session.get("authenticated")) {
        const user = await state.session.get("user")

        const body = request.body()
        const paramsForm = await body.value

        const amount = parseFloat(paramsForm.get("amount"))

        const account = await accountService.getAccountById(params.id);
        if (!account || account.user_id !== user.id) {
            response.status = 401;
            response.body = "You cannot withdraw from someone else's account.";
            return;
        }

        try {
            await accountService.withdrawFromAccountForUser(params.id, user.id, amount)
            response.redirect("/accounts");
        } catch (error) {
            if (error.message === "Insufficient funds") {
                response.status = 401
                response.body = "Insufficient funds for withdrawal."
            } else {
                response.status = 500
                response.body = "An error occurred."
            }
        }
    } else {
        response.status = 401
    }
}

export { addAccount, listAccounts, showAccount, depositIntoAccount, withdrawFromAccount };