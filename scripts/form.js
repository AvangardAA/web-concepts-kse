function form()
{
    // Get form inputs by their IDs
    const q1 = document.getElementById("q1").value;
    const q2 = document.getElementById("q2").value;
    const q3 = document.querySelector('input[name="q3"]:checked').value;
    const q4 = [];
    const q5 = document.querySelectorAll('input[name="q4"]:checked');
    q5.forEach(function (cb)
    {
        q4.push(cb.value);
    });

    // Display the answers in the table
    document.getElementById("answer-1").textContent = q1;
    document.getElementById("answer-2").textContent = q2;
    document.getElementById("answer-3").textContent = q3;
    document.getElementById("answer-4").textContent = q4.join(', ');
}