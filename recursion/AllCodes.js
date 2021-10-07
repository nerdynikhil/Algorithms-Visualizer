
var calls = 0;

function fibo(n) {
    console.log(n);
    if (calls++ > 200)
        throw new RecursionException("Maximum Stack Size Reached!!");

    let memoization = tree.find((obj) => {
        return obj.arg == n;
    });
    if (n <= 1) {
        let vtx = { arg: n, children: [], par: st[st.length - 1], depth: 0, result: n, cx: 0, cy: 0 };
        tree.push(vtx);
        if (memoization)
            tree[tree.length - 1].memo = true;
        else
            tree[tree.length - 1].memo = false;


        if (st.length > 0)
            tree[st[st.length - 1]].children.push(i);
        else ans = n;
        i++;

        return n;
    }
    else {
        let vtx = { arg: n, children: [], par: st[st.length - 1], depth: 0, result: 0, cx: 0, cy: 0 };
        tree.push(vtx);
        if (memoization)
            tree[tree.length - 1].memo = true;
        else
            tree[tree.length - 1].memo = false;

        let vid = i;
        st.push(i++);

        // let ret = fibo(n - 1) + 1;
        let ret = fibo(n - 1) + fibo(n - 2);
        // let ret = fibo(n - 1) + fibo(n - 2) + fibo(n - 3);

        vtx.result = ret;
        st.pop();
        if (st.length > 0)
            tree[st[st.length - 1]].children.push(vid);
        else ans = ret;

        return ret;
    }
}

function fact(n) {
    if (calls++ > 200)
        throw new RecursionException("Maximum Stack Size Reached!!");

    let memoization = tree.find((obj) => {
        return obj.arg == n;
    });

    if (n == 1) {
        let vtx = { arg: n, children: [], par: st[st.length - 1], depth: 0, result: n, cx: 0, cy: 0 };
        tree.push(vtx);
        if (memoization)
            tree[tree.length - 1].memo = true;
        else
            tree[tree.length - 1].memo = false;

        if (st.length > 0)
            tree[st[st.length - 1]].children.push(i);
        else ans = n;
        i++;

        return 1;
    }
    else {
        let vtx = { arg: n, children: [], par: st[st.length - 1], depth: 0, result: 0, cx: 0, cy: 0 };
        tree.push(vtx);
        if (memoization)
            tree[tree.length - 1].memo = true;
        else
            tree[tree.length - 1].memo = false;

        let vid = i;
        st.push(i++);

        let ret = n * fact(n - 1);

        vtx.result = ret;
        st.pop();
        if (st.length > 0)
            tree[st[st.length - 1]].children.push(vid);
        else ans = ret;

        return ret;
    }
}


function bincof(n, k) {
    if (calls++ > 200)
        throw new RecursionException("Maximum Stack Size Reached!!");

    let memoization = tree.find((obj) => {
        return obj.arg == `${n},${k}`;
    });
    if (k == n || k == 0) {
        let vtx = { arg: `${n},${k}`, children: [], par: st[st.length - 1], depth: 0, result: n, cx: 0, cy: 0 };
        tree.push(vtx);
        if (memoization)
            tree[tree.length - 1].memo = true;
        else
            tree[tree.length - 1].memo = false;


        if (st.length > 0)
            tree[st[st.length - 1]].children.push(i);
        else ans = n;
        i++;

        return n;
    }
    else {
        let vtx = { arg: `${n},${k}`, children: [], par: st[st.length - 1], depth: 0, result: 0, cx: 0, cy: 0 };
        tree.push(vtx);
        if (memoization)
            tree[tree.length - 1].memo = true;
        else
            tree[tree.length - 1].memo = false;

        let vid = i;
        st.push(i++);

        let ret = bincof(n - 1, k - 1) + bincof(n - 1, k);;

        vtx.result = ret;
        st.pop();
        if (st.length > 0)
            tree[st[st.length - 1]].children.push(vid);
        else ans = ret;

        return ret;
    }
}


function coin_change(arr, m, n) {

    if (calls++ > 200)
        throw new RecursionException("Maximum Stack Size Reached!!");

    let memoization = tree.find((obj) => {
        return obj.arg == `${n},${m}`;
    });

    if (n == 0) {
        let vtx = { arg: `${n},${m}`, children: [], par: st[st.length - 1], depth: 0, result: n, cx: 0, cy: 0 };
        tree.push(vtx);
        if (memoization)
            tree[tree.length - 1].memo = true;
        else
            tree[tree.length - 1].memo = false;


        if (st.length > 0)
            tree[st[st.length - 1]].children.push(i);
        else ans = n;
        i++;

        return 1;
    }

    if (n < 0) {
        let vtx = { arg: `${n},${m}`, children: [], par: st[st.length - 1], depth: 0, result: n, cx: 0, cy: 0 };
        tree.push(vtx);
        if (memoization)
            tree[tree.length - 1].memo = true;
        else
            tree[tree.length - 1].memo = false;


        if (st.length > 0)
            tree[st[st.length - 1]].children.push(i);
        else ans = n;
        i++;

        return 0;
    }

    if (m <= 0 && n >= 1) {
        let vtx = { arg: `${n},${m}`, children: [], par: st[st.length - 1], depth: 0, result: n, cx: 0, cy: 0 };
        tree.push(vtx);
        if (memoization)
            tree[tree.length - 1].memo = true;
        else
            tree[tree.length - 1].memo = false;


        if (st.length > 0)
            tree[st[st.length - 1]].children.push(i);
        else ans = n;
        i++;

        return 0;
    }

    let vtx = { arg: `${n},${m}`, children: [], par: st[st.length - 1], depth: 0, result: 0, cx: 0, cy: 0 };
    tree.push(vtx);
    if (memoization)
        tree[tree.length - 1].memo = true;
    else
        tree[tree.length - 1].memo = false;

    let vid = i;
    st.push(i++);

    let ret = coin_change(arr, m - 1, n) + coin_change(arr, m, n - arr[m - 1]);

    vtx.result = ret;
    st.pop();
    if (st.length > 0)
        tree[st[st.length - 1]].children.push(vid);
    else ans = ret;

    return ret;

}